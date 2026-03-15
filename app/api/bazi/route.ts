import { NextRequest, NextResponse } from 'next/server';
import { getBaziRecords, saveBaziRecord, getBaziRecordCount, deleteAllBaziRecords } from '../../lib/db';

// 获取用户所有命盘记录
export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ error: 'No user ID provided' }, { status: 400 });
    }

    const records = getBaziRecords(userId);

    return NextResponse.json({ records });
  } catch (error) {
    console.error('Error getting bazi records:', error);
    return NextResponse.json({ error: 'Failed to get records' }, { status: 500 });
  }
}

// 保存新命盘
export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ error: 'No user ID provided' }, { status: 400 });
    }

    // 检查保存上限
    const count = getBaziRecordCount(userId);
    if (count >= 5) {
      return NextResponse.json(
        { error: '已达到保存上限（5个），请删除旧记录后再保存' },
        { status: 400 }
      );
    }

    const body = await request.json();

    const recordId = saveBaziRecord({
      user_id: userId,
      name: body.name,
      gender: body.gender,
      birth_year: body.birthYear,
      year_pillar: body.yearPillar,
      month_pillar: body.monthPillar,
      day_pillar: body.dayPillar,
      hour_pillar: body.hourPillar,
      start_age: body.startAge,
      first_da_yun: body.firstDaYun,
      analysis_result: body.analysisResult,
      chart_data: body.chartData,
    });

    return NextResponse.json({ id: recordId, message: '保存成功' });
  } catch (error) {
    console.error('Error saving bazi record:', error);
    return NextResponse.json({ error: 'Failed to save record' }, { status: 500 });
  }
}

// 删除用户所有命盘记录
export async function DELETE(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');

    if (!userId) {
      return NextResponse.json({ error: 'No user ID provided' }, { status: 400 });
    }

    deleteAllBaziRecords(userId);

    return NextResponse.json({ message: '已删除所有数据' });
  } catch (error) {
    console.error('Error deleting all records:', error);
    return NextResponse.json({ error: 'Failed to delete records' }, { status: 500 });
  }
}
