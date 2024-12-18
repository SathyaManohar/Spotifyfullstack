import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
export const Playercontext = createContext();

const Playercontextprovider = (props) => {
    const audioRef = useRef();
    const seekBar = useRef();
    
    const [allsongs, setallsongs] = useState([]);
    const [allalbums, setallalbums] = useState([]);
    const [track, setTrack] = useState(null);
    const [playstatus, setplaystatus] = useState(false);
    const [time, settime] = useState({
        currenttime: { second: 0, minute: 0 },
        totaltime: { second: 0, minute: 0 }
    });

    const play = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setplaystatus(true);
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setplaystatus(false);
        }
    };

    const togglePlayPause = () => {
        if (playstatus) {
            pause();
        } else {
            play();
        }
    };

    const playwithid = async (id) => {
        const song = allsongs.find((song) => song._id === id);
        if (song) {
            setTrack(song);
            audioRef.current.play();
            setplaystatus(true);
        }
    };

    const previous = async () => {
        if (track) {
            const currentIndex = allsongs.findIndex((song) => song._id === track._id);
            if (currentIndex > 0) {
                const previousTrack = allsongs[currentIndex - 1];
                setTrack(previousTrack); // Set the new track
    
                // Ensure the audio element is reset before playing
                audioRef.current.pause(); // Pause the current song
                audioRef.current.currentTime = 0; // Reset to the start of the song
                audioRef.current.src = previousTrack.url; // Set the new song URL
                audioRef.current.load(); // Load the new song
    
                // Force the play action
                setTimeout(() => {
                    audioRef.current.play(); // Play the new song
                    setplaystatus(true); // Update play status
                }, 50); // Add a slight delay to ensure that the song is ready
            }
        }
    };
    
    const next = async () => {
        if (track) {
            const currentIndex = allsongs.findIndex((song) => song._id === track._id);
            if (currentIndex < allsongs.length - 1) {
                const nextTrack = allsongs[currentIndex + 1];
                setTrack(nextTrack); // Set the new track
    
                // Ensure the audio element is reset before playing
                audioRef.current.pause(); // Pause the current song
                audioRef.current.currentTime = 0; // Reset to the start of the song
                audioRef.current.src = nextTrack.url; // Set the new song URL
                audioRef.current.load(); // Load the new song
    
                // Force the play action
                setTimeout(() => {
                    audioRef.current.play(); // Play the new song
                    setplaystatus(true); // Update play status
                }, 50); // Add a slight delay to ensure that the song is ready
            }
        }
    };
    
    

    const seeksong = (e) => {
        const seekTime = (e.nativeEvent.offsetX / seekBar.current.offsetWidth) * audioRef.current.duration;
        audioRef.current.currentTime = seekTime;
        audioRef.current.play();
        setplaystatus(true);
    };

    const getallsongs = async () => {
        try {
            const response = await axios.get("http://localhost:7000/api/song/list");
            console.log("all songs",response.data.songs);
            if (response.data.success) {
                
                setallsongs(response.data.songs);
                setTrack(response.data.songs[0]);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const getallalbums = async () => {
        try {
            const response = await axios.get("http://localhost:7000/api/album/list");
            console.log("all songs",response.data.message)
            if (response.data.status === "success") {
                setallalbums(response.data.message);
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    useEffect(() => {
        getallsongs();
        getallalbums();
    }, []); // Fetch data once when the component mounts

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.ontimeupdate = () => {
                if (audioRef.current.duration) {
                    seekBar.current.style.width =
                        (audioRef.current.currentTime / audioRef.current.duration) * 100 + "%";

                    settime({
                        currenttime: {
                            second: Math.floor(audioRef.current.currentTime % 60),
                            minute: Math.floor(audioRef.current.currentTime / 60),
                        },
                        totaltime: {
                            second: Math.floor(audioRef.current.duration % 60),
                            minute: Math.floor(audioRef.current.duration / 60),
                        },
                    });
                }
            };
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.ontimeupdate = null;
            }
        };
    }, [audioRef]);

    const contextvalue = {
        audioRef,
        seekBar,
        setTrack,
        setplaystatus,
        settime,
        time,
        track,
        playstatus,
        play,
        pause,
        togglePlayPause,
        playwithid,
        next,
        previous,
        seeksong,
        allalbums,
        allsongs,
    };

    return (
        <Playercontext.Provider value={contextvalue}>
            {props.children}
        </Playercontext.Provider>
    );
};

export default Playercontextprovider;
