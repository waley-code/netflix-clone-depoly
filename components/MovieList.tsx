import React from 'react';
import {divide, isEmpty} from 'lodash';
import MovieCard from './MovieCard';

interface MovieListProps {
    title: string;
    data?: Record<string, any>[];
}

const MovieList: React.FC<MovieListProps> = ({data, title}) => {
    if (isEmpty(data)) {
        return null;
    }
    
    return (
        <div className='px-4 md:px-12 mt-4 space-y-8'>
            <div>
                <p className='text-white text-md md:text-xl lg:text-2xl font-semibold mb-4'>
                    {title}
                </p>
                <div className='grid grid-cols-4'>
                    {data?.map((x) => <MovieCard key={x.id} data={x}/>)}
                </div>
            </div>
        </div>
    )
}

export default MovieList;