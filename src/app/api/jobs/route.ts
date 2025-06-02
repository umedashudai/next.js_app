import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
  const { data, error } = await supabase.from('jobs').select('*');
  if (error) {
    console.error('Supabase error:', error.message);
    return NextResponse.json(
      { error: '求人取得に失敗しました' },
      { status: 500, headers: corsHeaders }
    );
  }
  return NextResponse.json(data, { headers: corsHeaders });
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log('POST body:', body);
  const { title, salary, category } = body.job;

  if (!title || !salary || !category) {
    return NextResponse.json(
      { error: 'title, salary, categoryが必要です' },
      { status: 400, headers: corsHeaders }
    );
  }

  const { data, error } = await supabase
    .from('jobs')
    .insert([{ title, salary, category }])
    .select();

  if (error) {
    console.error('Supabase error:', error.message);
    return NextResponse.json(
      { error: '求人投稿に失敗しました' },
      { status: 500, headers: corsHeaders }
    );
  }
  return NextResponse.json(data[0], { status: 201, headers: corsHeaders });
}
