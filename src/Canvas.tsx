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

const slicedDatetime = (datetime: string) => {
  const months = [
    'JAN', 'FEV', 'MAR', 'ABR',
    'MAI', 'JUN', 'JUL', 'AGO',
    'SET', 'OUT', 'NOV', 'DEZ'
  ];
  const date = new Date(datetime);
  const day = date.getDate().toString().padStart(2, '0');
  const month = months[date.getMonth()];
  const time = date.toLocaleTimeString();
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
  ctx.font = '500 150px "Capitana Sans Serif Font"';
  ctx.fillText(day, 560, 1290);
}

const writeMonth = (ctx: CanvasRenderingContext2D, month: string) => () => {
  ctx.font = '150px "Capitana Sans Serif Font"';
  ctx.fillText(month, 860, 1290);
}

const writeTime = (ctx: CanvasRenderingContext2D, time: string) => () => {
  ctx.font = '500 150px "Capitana Sans Serif Font"';
  ctx.fillText(time, 1100, 1290);
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
