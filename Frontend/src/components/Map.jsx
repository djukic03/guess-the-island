import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IslandFound from './IslandFound';
import Lives from './Lives';
import EndGame from './EndGame';

const Map = () => {
    const matrixSize = 30;
    const [mapData, setMapData] = useState("");
    const [islands, setIslands] = useState([]);
    const [isIslandGuessed, setIsIslandGuessed] = useState(false);
    const [lives, setLives] = useState(3);
    const [endGame, setEndGame] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method: 'GET',
                url: 'http://localhost:5000/api/jobfair',
            };
            try {
                const response = await axios.request(options);
                const mapData = response.data;
                setMapData(mapData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const matrix = mapData
        .trim()
        .split("\n") 
        .map((row) => row.trim().split(/\s+/).map(Number));

    const dfs = (i, j, visited, islandCoordinates, islandSum) => {
        if (i < 0 || i >= matrix.length || j < 0 || j >= matrix[0].length || matrix[i][j] === 0 || visited[i][j]) {
            return;
        }

        visited[i][j] = true;
        islandCoordinates.push([i, j]);
        islandSum[0] += matrix[i][j];

        dfs(i + 1, j, visited, islandCoordinates, islandSum); 
        dfs(i - 1, j, visited, islandCoordinates, islandSum); 
        dfs(i, j + 1, visited, islandCoordinates, islandSum); 
        dfs(i, j - 1, visited, islandCoordinates, islandSum); 
    };

    const findIslands = () => {
        const visited = Array.from({ length: matrix.length }, () => Array(matrix[0].length).fill(false));
        const islandData = [];

        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                if (matrix[i][j] !== 0 && !visited[i][j]) {
                    const islandCoordinates = [];
                    const islandSum = [0];
                    dfs(i, j, visited, islandCoordinates, islandSum);
                    const islandAverageHeight = islandSum[0] / islandCoordinates.length;
                    islandData.push({ coordinates: islandCoordinates, average: islandAverageHeight });
                }
            }
        }

        return islandData;
    };

    
    useEffect(() => {
        if (mapData){
            setIslands(findIslands());
        }
    }, [mapData]);
    

    const IslandWithHighestAvg = islands.reduce((maxIsland, currentIsland) => {
        return currentIsland.average > maxIsland.average ? currentIsland : maxIsland;
    }, islands[0]);

    const handleIslandClick = (island) => {
        
        if (island.average === IslandWithHighestAvg.average) {
        setIsIslandGuessed(true);
        }
        else {
            setLives(lives - 1);
        }
        if (lives === 1) {
            setEndGame(true);
        }
    };

    const getColorRange = (height) => {
        if (height === 0) return "0";
        if (height >= 1 && height <= 250) return "1-250";
        if (height >= 251 && height <= 350) return "251-350";
        if (height >= 351 && height <= 500) return "351-500";
        if (height >= 501 && height <= 750) return "501-750";
        if (height >= 751 && height <= 900) return "751-900";
        if (height >= 901 && height <= 1000) return "901-1000";
        return "default";
    };

    return (
        <>
            <div className="map-container">
                <div className="map">
                    {matrix.map((row, rowIndex) => (
                        row.map((height, colIndex) => (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className="cell"
                                data-height={getColorRange(height)}
                                style={{ backgroundColor: getColorRange(height), cursor: height > 0 ? 'pointer' : 'default', }}
                                onClick={() => {
                                    const clickedIsland = islands.find(island => island.coordinates.some(([x, y]) => x === rowIndex && y === colIndex));
                                    handleIslandClick(clickedIsland);
                                }}
                            />
                        ))
                    ))}
                </div>
            </div>
            <Lives lives={lives} />
            {isIslandGuessed ? (
                <IslandFound />
            ) : null}
            {endGame ? (
                <EndGame />
            ): null}
        </>
    );
};

export default Map;
