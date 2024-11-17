import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Map = () => {
    const matrixSize = 30;
    const [mapData, setMapData] = useState("");
    const [islands, setIslands] = useState([]);
    const [selectedIsland, setSelectedIsland] = useState(null);

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
        setSelectedIsland(island);
    };

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${matrix.length}, 20px)`,
    };

    const getColorRange = (height) => {
        if (height === 0) return "0";
        if (height >= 1 && height <= 100) return "1-100";
        if (height >= 101 && height <= 250) return "101-250";
        if (height >= 251 && height <= 500) return "251-500";
        if (height >= 501 && height <= 750) return "501-750";
        if (height >= 751 && height <= 900) return "751-900";
        if (height >= 901 && height <= 1000) return "901-1000";
        return "default";
    };

    return (
        <>
            <div className="map" style={gridStyle}>
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

            <div>
                <h1>Matrix Area Finder</h1>
                <p>Number of islands: {islands.length}</p>
                <div>
                    {islands.map((area, index) => (
                        <div key={index}>
                            <h3>Area {index + 1} </h3>
                            <p>Average Value: {area.average}</p>
                        </div>
                    ))}
                </div>
                <div>
                    {IslandWithHighestAvg ? (
                        <div>
                            <h2>Area with the Highest Average Value</h2>
                            <p>Coordinates: {IslandWithHighestAvg.coordinates.map(([x, y]) => `[${x}, ${y}]`).join(", ")}</p>
                            <p>Average Value: {IslandWithHighestAvg.average}</p>
                        </div>
                    ) : (
                        <p>No islands found.</p>
                    )}
                </div>
            </div>

            <div>
                    {selectedIsland ? (
                        <div>
                            <h2>Selected Area</h2>
                            <p>Coordinates: {selectedIsland.coordinates.map(([x, y]) => `[${x}, ${y}]`).join(", ")}</p>
                            <p>Average Value: {selectedIsland.average}</p>
                        </div>
                    ) : (
                        <p>No area selected.</p>
                    )}
                </div>
        </>
    );
};

export default Map;
