
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}


export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM jobs');
    return NextResponse.json(result.rows, { headers: corsHeaders });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json(
      { error: '求人取得に失敗しました' },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, salary, category } = body.job;

    if (!title || !salary || !category) {
      return NextResponse.json(
        { error: 'title, salary, categoryが必要です' },
        { status: 400, headers: corsHeaders }
      );
    }

    const insertQuery = `
      INSERT INTO jobs (title, salary, category)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const values = [title, salary, category];
    const result = await pool.query(insertQuery, values);

    return NextResponse.json(result.rows[0], { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json(
      { error: '求人投稿に失敗しました' },
      { status: 500, headers: corsHeaders }
    );
  }
}