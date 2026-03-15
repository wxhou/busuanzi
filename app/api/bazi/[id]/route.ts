import { NextRequest, NextResponse } from 'next/server';
import { getBaziRecordById, updateBaziRecord, deleteBaziRecord } from '../../../lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const record = getBaziRecordById(id);

    if (!record) {
      return NextResponse.json({ error: 'Record not found' }, { status: 404 });
    }

    return NextResponse.json({ record });
  } catch (error) {
    console.error('Error getting bazi record:', error);
    return NextResponse.json({ error: 'Failed to get record' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    updateBaziRecord(id, body.name);

    return NextResponse.json({ message: '更新成功' });
  } catch (error) {
    console.error('Error updating bazi record:', error);
    return NextResponse.json({ error: 'Failed to update record' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    deleteBaziRecord(id);

    return NextResponse.json({ message: '删除成功' });
  } catch (error) {
    console.error('Error deleting bazi record:', error);
    return NextResponse.json({ error: 'Failed to delete record' }, { status: 500 });
  }
}
