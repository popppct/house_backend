import { Request, Response } from 'express';
import { pool } from '../database';
import { QueryResult } from 'pg';

export const getPostCode = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await
            pool.query('SELECT post_code FROM post_code');
        return res.status(200).json({payload:response.rows});
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const getPostCodeById = async (req: Request, res: Response): Promise<Response> => {
    const post_code_no = req.params.id;
    const response: QueryResult = await pool.query('SELECT average,median FROM post_code WHERE post_code = $1', [post_code_no]);
    return res.json({payload:response.rows[0]});
};