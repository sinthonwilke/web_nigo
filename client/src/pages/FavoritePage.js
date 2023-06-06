import Games from '../components/Games';
import gStyles from '../styles/global.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { favGamesUrl, collectionUrl } from '../services/apiList';
import styles from '../styles/GamePage.module.css';
import loadStyle from '../styles/Loading.module.css';
import authConfig from '../services/authConfig';
import PopCollection from '../components/PopCollection';


function FavoritePage() {
    const [gameList, setGameList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [collectionList, setCollectionList] = useState([]);
    const [isPopCollection, setIsPopCollection] = useState(false);
    const [gameId, setGameId] = useState(null);
    const [isMessageReceived, setIsMessageReceived] = useState(false);
    const [isPopCollectionVisible, setPopCollectionVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const gameListResponse = await axios.get(favGamesUrl, authConfig);
                const updatedGameList = gameListResponse.data.map((gameList, index) => ({
                    ...gameList,
                    id: index + 1
                }));
                setGameList(updatedGameList);

                const collectionListRes = await axios.get(collectionUrl, authConfig);
                const updatedCollectionList = collectionListRes.data.map((collectionList, index) => ({
                    ...collectionList,
                    id: index + 1
                }));
                setCollectionList(updatedCollectionList);

                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleChildSignal = (gameId) => {
        setIsMessageReceived(true);
        setGameId(gameId);
        setPopCollectionVisible(!isPopCollectionVisible);
    };

    const handleClosePopCollection = () => {
        setPopCollectionVisible(false);
    };

    if (isLoading) {
        return (
            <>
                <h1 className={gStyles.head}>Favorite</h1>
                <div className={loadStyle.loadBody}>
                    <div className={loadStyle.loading}>
                        <div className={loadStyle.dot}></div>
                        <div className={loadStyle.dot}></div>
                        <div className={loadStyle.dot}></div>
                        <div className={loadStyle.dot}></div>
                        <div className={loadStyle.dot}></div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <h1 className={gStyles.head}>Favorite</h1>
                <div className={styles.gameContainer}>
                    {gameList.map(game => (
                        <div className={styles.item} key={game._id}>
                            <Games game={game} fromFavPage={true} onSignal={handleChildSignal} />
                        </div>
                    ))}
                </div>
                {isPopCollectionVisible && (
                    <PopCollection onClose={handleClosePopCollection} collectionList={collectionList} gameId={gameId} />
                )}
            </>
        );
    }
}

export default FavoritePage;