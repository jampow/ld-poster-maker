import { useRef } from 'react'
import './Canvas.css'
import printAtWordWrap from './utils/printAtWordWrap'

interface CanvasProps {
  title: string;
  datetime: string;
}

const loadImage = (src: string) => {
  return new Promise((resolve) => {
    const img = new Image;
    img.onload = () => {
      resolve(img);
    }
    img.src = src;
  })
}

const nextWednesday = () => {
  const date = new Date();
  const day = date.getDay();
  const daysUntilWednesday = 3 - day;
  date.setDate(date.getDate() + daysUntilWednesday);
  date.setHours(11);
  date.setMinutes(0);
  return date.toISOString();
}

const slicedDatetime = (datetime: string) => {
  const months = [
    'JAN', 'FEV', 'MAR', 'ABR',
    'MAI', 'JUN', 'JUL', 'AGO',
    'SET', 'OUT', 'NOV', 'DEZ'
  ];
  const date = datetime === '' ? nextWednesday() : datetime;
  const [_year, monthNumber, day, hour, minute] = date.split(/[-T:]/);
  const month = months[parseInt(monthNumber) - 1];
  const time = `${hour}:${minute}`;
  return { day, month, time };
}

const drawBackground = (ctx: CanvasRenderingContext2D) => (img) => {
  ctx.drawImage(img, 0, 0);
}

const writeTitle = (ctx: CanvasRenderingContext2D, title: string) => () => {
  ctx.font = '500 124px "Capitana Sans Serif Font"';
  ctx.fillStyle = 'white';
  printAtWordWrap(ctx, title, 246, 830, 130, 1198);
}

const drawHorizontalRule = (ctx: CanvasRenderingContext2D) => () => {
  ctx.strokeStyle = 'white';
  ctx.beginPath();
  ctx.lineTo(246, 1090);
  ctx.lineTo(246 + 1198, 1090);
  ctx.lineWidth = 13;
  ctx.stroke();
}

const drawCalendarIcon = (ctx: CanvasRenderingContext2D) => () => {
  const calendarIcon = new Image();
  calendarIcon.onload = () => ctx.drawImage(calendarIcon, 230, 1175);
  calendarIcon.src = 'images/calendar.svg';
}

const writeDay = (ctx: CanvasRenderingContext2D, day: string) => () => {
  ctx.font = '500 100px "Capitana Sans Serif Font"';
  if (isNaN(parseInt(day))) return;
  ctx.fillText(day, 560, 1290);
}

const writeMonth = (ctx: CanvasRenderingContext2D, month: string) => () => {
  ctx.font = '100px "Capitana Sans Serif Font"';
  if (month === undefined) return;
  ctx.fillText(month, 720, 1290);
}

const writeTime = (ctx: CanvasRenderingContext2D, time: string) => () => {
  ctx.font = '500 100px "Capitana Sans Serif Font"';
  ctx.fillText(time, 560, 1420);
}

export default ({ title, datetime }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvas = canvasRef.current;
  const ctx = canvas?.getContext('2d');
  const { day, month, time } = slicedDatetime(datetime);

  if (ctx) {
    loadImage('/images/bg.png')
      .then(drawBackground(ctx))
      .then(writeTitle(ctx, title))
      .then(drawHorizontalRule(ctx))
      .then(drawCalendarIcon(ctx))
      .then(writeDay(ctx, day))
      .then(writeMonth(ctx, month))
      .then(writeTime(ctx, time))
  }

  return (
    <canvas ref={canvasRef} width="3227" height="1670" />
  )
}
