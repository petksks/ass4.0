import React, { useState } from "react";
import "./styles.css";

function MatchDetails() {
    const [matchId, setMatchId] = useState("");
    const [matchData, setMatchData] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(
            `https://api.opendota.com/api/matches/${matchId}?api_key=17dbd3e8-bd66-49b6-94ab-11ad397aecf1`
        );
        const data = await response.json();
        setMatchData(data);
    };

    return (
        <div className="container">
            <h1>Match Details</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter Match ID:
                    <input
                        type="text"
                        value={matchId}
                        onChange={(event) => setMatchId(event.target.value)}
                    />
                </label>
                <button type="submit">Fetch Details</button>
            </form>
            {matchData && (
                <div className="match-details">
                    <h2>Match ID: {matchData.match_id}</h2>
                    <p>Duration: {matchData.duration}</p>
                    <p>Winner: {matchData.radiant_win ? "Radiant" : "Dire"}</p>
                    <p>Game Mode: {matchData.game_mode}</p>
                    <h3>Net Worth:</h3>
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Player Name</th>
                                    <th>Net Worth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matchData.players
                                    .sort((a, b) => b.total_gold - a.total_gold)
                                    .map((player) => (
                                        <tr key={player.hero_id}>
                                            <td>{player.personaname || 'Unknown'}</td>
                                            <td>{player.total_gold}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default MatchDetails;
