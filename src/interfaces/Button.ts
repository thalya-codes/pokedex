import React from 'react';


export interface IProps {
    limit: number;
    setOffset: React.Dispatch<React.SetStateAction<number>>
    offset: number;
    total_page: number;

}