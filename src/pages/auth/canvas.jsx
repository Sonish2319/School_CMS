import { useRef, useState, useEffect } from "react";
import { RefreshCw } from "lucide-react"; 

const generateCaptcha = (length = 6) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captchaCode = "";
  for (let i = 0; i < length; i++) {
    captchaCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captchaCode;
};

const CanvasCaptcha = ({ onCaptchaChange }) => {
  const canvasRef = useRef(null);
  const [captchaCode, setCaptchaCode] = useState("");

  const drawCaptcha = (code) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  
      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;
  
      // Set background with slight texture
      ctx.fillStyle = "#f8f8f8";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
      // Add MAXIMUM noise: random lines
      for (let i = 0; i < 15; i++) {
        ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`;
        ctx.lineWidth = Math.random() * 2;
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
        ctx.lineTo(Math.random() * canvasWidth, Math.random() * canvasHeight);
        ctx.stroke();
      }
  
      // Add random dots for more noise
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.5)`;
        ctx.beginPath();
        ctx.arc(Math.random() * canvasWidth, Math.random() * canvasHeight, Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();
      }
  
      // Define distorted fonts list
      const fonts = ["Courier New", "Comic Sans MS", "Times New Roman", "Verdana", "Arial Black"];
  
      let x = 10; // Start from the top-left
      let y = 30; // Start position to ensure text fits
  
      const maxCharWidth = (canvasWidth - 30) / code.length; // Dynamic spacing
      const yStep = (canvasHeight - 40) / code.length; // Step to move diagonally
  
      for (let i = 0; i < code.length; i++) {
        const fontSize = Math.random() * 10 + 28; // Adjusted font size (28px - 38px)
        const rotation = (Math.random() - 0.5) * 0.4; // Smaller rotation range (-0.2 to 0.2 radians)
        const fontWeight = Math.random() > 0.5 ? "bold" : "normal";
        const fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
  
        ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        ctx.fillStyle = `rgba(${Math.random() * 150}, 0, 0, 0.6)`; // Darker color with 80% opacity
  
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.fillText(code[i], 0, 0);
        ctx.restore();
  
        x += maxCharWidth; // Move right
        y += yStep; // Move down diagonally
      }
    }
  };
    
  const refreshCaptcha = () => {
    const newCode = generateCaptcha();
    setCaptchaCode(newCode);
    drawCaptcha(newCode);
    if (onCaptchaChange) onCaptchaChange(newCode);
  };

  useEffect(() => {
    // refreshCaptcha();
  }, []);

  return (
    <div className="flex items-center space-x-2 ">
      <canvas ref={canvasRef} width={200} height={50} className="border border-gray-300" />
      <button onClick={refreshCaptcha} aria-label="Refresh CAPTCHA">
        <RefreshCw size={24} className="text-gray-600 hover:text-gray-800 transition-transform transform hover:rotate-180" />
      </button>
    </div>
  );
};

export default CanvasCaptcha;
