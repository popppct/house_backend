import { Request, Response } from 'express';
import { pool } from '../database';
import { QueryResult } from 'pg';

export const getHouse = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { skip, take } = req.query;
        const response: QueryResult = await
            pool.query('SELECT id,house_name AS name,house_desc as desc,house_price as price,house_post_code as post_code FROM house OFFSET $1 ROWS FETCH NEXT $2 ROWS ONLY',[skip, take]);
        return res.status(200).json({payload:response.rows,count:response.rows.length});
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const createHouse = async (req: Request, res: Response) => {
    const { name, desc, price, post_code } = req.body;
    const response = await pool.query('INSERT INTO house (house_name, house_desc, house_price, house_post_code) VALUES ($1, $2, $3, $4)', [name, desc, price, post_code]);
    res.json({
        message: 'House Added successfully',
    })
};

export const updateHouse = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, desc, price, post_code } = req.body;

    const response = await pool.query('UPDATE house SET house_name = $1, house_desc = $2, house_price = $3, house_post_code = $4 WHERE id = $5', [
        name,
        desc,
        price,
        post_code,
        id
    ]);
    res.json('User Updated Successfully');
};

export const deleteHouse = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM house where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};