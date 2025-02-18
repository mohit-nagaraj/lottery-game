"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Define types
type Grid = (number | string)[][];
type Cuts = boolean[][];

const Home = () => {
  // State variables
  const [user1Grid, setUser1Grid] = useState<Grid>(Array(3).fill(Array(3).fill("")))
  const [user2Grid, setUser2Grid] = useState<Grid>(Array(3).fill(Array(3).fill("")))
  const [user1Cuts, setUser1Cuts] = useState<Cuts>(Array(3).fill(Array(3).fill(false)))
  const [user2Cuts, setUser2Cuts] = useState<Cuts>(Array(3).fill(Array(3).fill(false)))
  const [gameStarted, setGameStarted] = useState<boolean>(false)
  const [generatedNumbers, setGeneratedNumbers] = useState<number[]>([])
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [timer, setTimer] = useState<number>(0)

  // Handle input change for a specific grid
  const handleChange = (user: "user1" | "user2", row: number, col: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value < 1 || value > 9) return;

    const newGrid = user === "user1" ? user1Grid.map((r) => [...r]) : user2Grid.map((r) => [...r]);
    newGrid[row][col] = value;
    if (user === "user1") setUser1Grid(newGrid);
    else setUser2Grid(newGrid);
  };

  // Start the game
  const handleStartGame = async () => {
    console.log("Starting game...");
    if (!validateGrids()) {
      alert("Please fill both grids with unique numbers between 1-9.");
      return;
    }

    setGameStarted(true);
    // Send grids to the backend
    try {
      const response = await fetch("http://localhost:5000/api/game/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user1Grid, user2Grid }),
      });
      const data = await response.json();
      console.log("Game started:", data);
    } catch (error) {
      console.error("Error starting game:", error);
    }
  };

  // Stop the game and reset grids
  const handleStopGame = () => {
    setUser1Grid(Array(3).fill(Array(3).fill("")));
    setUser2Grid(Array(3).fill(Array(3).fill("")));
    setUser1Cuts(Array(3).fill(Array(3).fill(false)));
    setUser2Cuts(Array(3).fill(Array(3).fill(false)));
    setGameStarted(false);
    setGeneratedNumbers([]);
    setIsGenerating(false);
    setTimer(0);
  };

  // Validate grids for unique numbers between 1-9
  const validateGrids = (): boolean => {
    const allNumbersU1 = user1Grid.flat()
    const allNumbersU2 = user2Grid.flat()
    return (
      allNumbersU1.length === 9 &&
      allNumbersU1.every((num) => typeof num === "number" && num >= 1 && num <= 9) &&
      allNumbersU2.length === 9 &&
      allNumbersU2.every((num) => typeof num === "number" && num >= 1 && num <= 9) 
    );
  };

  // Generate a random number and update cuts
  const generateRandomNumber = async () => {
    setIsGenerating(true);
    setTimer(2);

    // Start a 2-second timer
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearInterval(interval);

    const number = Math.floor(Math.random() * 9) + 1;
    if (generatedNumbers.includes(number)) {
      setIsGenerating(false);
      return; // Skip if number already generated
    }

    setGeneratedNumbers([...generatedNumbers, number]);

    // Update cuts for both users
    const newUser1Cuts = user1Grid.map((row, i) =>
      row.map((cell, j) => (cell === number ? true : user1Cuts[i][j]))
    );
    const newUser2Cuts = user2Grid.map((row, i) =>
      row.map((cell, j) => (cell === number ? true : user2Cuts[i][j]))
    );

    setUser1Cuts(newUser1Cuts);
    setUser2Cuts(newUser2Cuts);

    // Send the number to the backend
    try {
      await fetch("http://localhost:5000/api/game/cut", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number }),
      });
    } catch (error) {
      console.error("Error cutting number:", error);
    }

    setIsGenerating(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lottery Game</h1>
      <div className="flex items-center justify-center"></div>
      <div className="max-w-screen-md">

      <div className="grid grid-cols-2 gap-4">
        {/* User 1 Grid */}
        <Card>
          <CardHeader>
            <CardTitle>User 1 Grid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {user1Grid.map((row, i) =>
                row.map((cell, j) => (
                  <Input
                    key={`user1-${i}-${j}`}
                    type="number"
                    min="1"
                    max="9"
                    value={cell}
                    onChange={handleChange("user1", i, j)}
                    className="text-center"
                    disabled={gameStarted}
                  />
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* User 2 Grid */}
        <Card>
          <CardHeader>
            <CardTitle>User 2 Grid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {user2Grid.map((row, i) =>
                row.map((cell, j) => (
                  <Input
                    key={`user2-${i}-${j}`}
                    type="number"
                    min="1"
                    max="9"
                    value={cell}
                    onChange={handleChange("user2", i, j)}
                    className="text-center"
                    disabled={gameStarted}
                  />
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      

      {/* Display Cuts */}
      {gameStarted&&<div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Cuts</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3>User 1 Cuts</h3>
            <div className="grid grid-cols-3 gap-4">
              {user1Cuts.map((row, i) =>
                row.map((cut, j) => (
                  <div
                    key={`user1-cut-${i}-${j}`}
                    className={`p-4 border rounded-lg text-center ${
                      cut ? "bg-red-200" : "bg-white"
                    }`}
                  >
                    {user1Grid[i][j]}
                  </div>
                ))
              )}
            </div>
          </div>
          <div>
            <h3>User 2 Cuts</h3>
            <div className="grid grid-cols-3 gap-4">
              {user2Cuts.map((row, i) =>
                row.map((cut, j) => (
                  <div
                    key={`user2-cut-${i}-${j}`}
                    className={`p-4 border rounded-lg text-center ${
                      cut ? "bg-red-200" : "bg-white"
                    }`}
                  >
                    {user2Grid[i][j]}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>}

      {/* Buttons */}
      <div className="mt-4 space-x-4">
        <Button onClick={handleStartGame} disabled={gameStarted}>
          Start Game
        </Button>
        <Button onClick={handleStopGame} disabled={!gameStarted}>
          Stop Game
        </Button>
        <Button onClick={generateRandomNumber} disabled={!gameStarted || isGenerating}>
          Generate Number
        </Button>
      </div>
      

      {/* Timer Loader */}
      {isGenerating && (
        <div className="mt-4">
          <p>Generating number in {timer} seconds...</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default Home;