import { FlatList, useToast } from 'native-base';
import { useState, useEffect } from 'react';
import { api } from '../server/api';
import { Game, IGameProps } from './Game';
import { Loading } from './Loading';

export function Guesses(poolId: string) {
    const [isLoading, setIsLoading] = useState(true)
    const [games, setGames] = useState<IGameProps[]>([])
    const [firstTeamPoints, setFirstTeamPoints] = useState('')
    const [secondTeamPoints, setSecondTeamPoints] = useState('')
    
    const toast = useToast();

    async function fetchGames() {
        try {
            setIsLoading(true)

            const response = await api.get(`/pools/${poolId}/games`)
            setGames(response.data.games);
            console.log(response.data.games);
        } catch(err) {
            toast.show({
                title: "Não foi possível listar os jogos :/",
                placement: 'top',
                bgColor: 'red.500'
            });
        } finally {
            setIsLoading(false)
        }
    }


}