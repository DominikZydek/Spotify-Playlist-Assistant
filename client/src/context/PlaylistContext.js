import React, { createContext, useEffect, useState } from 'react';

export const PlaylistContext = createContext();

export const PlaylistProvider = ({ children }) => {
    const [selectedPlaylist, setSelectedPlaylist] = useState(() => {
        const savedPlaylist = localStorage.getItem('selectedPlaylist');
        return savedPlaylist ? JSON.parse(savedPlaylist) : null;
    
    });

    useEffect(() => {
        if (selectedPlaylist) {
            localStorage.setItem('selectedPlaylist', JSON.stringify(selectedPlaylist));
        } else {
            localStorage.removeItem('selectedPlaylist');
        }
    }, [selectedPlaylist]);

    return (
        <PlaylistContext.Provider value={{ selectedPlaylist, setSelectedPlaylist }}>
            {children}
        </PlaylistContext.Provider>
    );
}