<template>
  <div class="app">
    <h1 class="title">画像モザイクフィルタ</h1>
    <!-- ファイル選択 -->
    <input type="file" @change="handleImageUpload" accept="image/*" />
    
    <!-- モザイク強度のスライダー -->
    <div v-if="originalImage">
      <label for="mosaic-slider">モザイク強度: {{ blockSize }}</label>
      <input
        id="mosaic-slider"
        type="range"
        min="5"
        max="100"
        v-model="blockSize"
        @input="applyMosaic"
      />
    </div>
    
    <!-- プレビューキャンバス -->
    <canvas ref="canvas" style="max-width: 100%;"></canvas>
    
    <!-- ダウンロードボタン (常に表示、画像未セット時には無効化) -->
    <button :disabled="!originalImage" @click="downloadImage">画像をダウンロード</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      originalImage: null, // アップロードされた画像データ
      blockSize: 10,       // モザイク強度（初期値10）
    };
  },
  methods: {
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          this.originalImage = img;

          const canvas = this.$refs.canvas;
          canvas.width = img.width;
          canvas.height = img.height;

          this.applyMosaic();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    applyMosaic() {
      if (!this.originalImage) return;

      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(this.originalImage, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const blockSize = parseInt(this.blockSize);

      for (let y = 0; y < canvas.height; y += blockSize) {
        for (let x = 0; x < canvas.width; x += blockSize) {
          const i = (y * canvas.width + x) * 4;
          const red = data[i];
          const green = data[i + 1];
          const blue = data[i + 2];

          for (let dy = 0; dy < blockSize; dy++) {
            for (let dx = 0; dx < blockSize; dx++) {
              const nx = x + dx;
              const ny = y + dy;
              if (nx < canvas.width && ny < canvas.height) {
                const j = (ny * canvas.width + nx) * 4;
                data[j] = red;
                data[j + 1] = green;
                data[j + 2] = blue;
              }
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
    },

    downloadImage() {
      const canvas = this.$refs.canvas;
      const link = document.createElement("a");
      link.download = "mosaic_image.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    },
  },
};
</script>

<style>
body {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  color: #333;
  line-height: 1.6;
}

.app {
  max-width: 800px;
  margin: 40px auto;
  padding: 30px;
  background-color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.title {
  font-size: 2.5em;
  color: #2c2c2c;
  margin-bottom: 30px;
  font-weight: 300;
  letter-spacing: -1px;
}

input[type="file"] {
  border: 2px dashed #ccc;
  border-radius: 4px;
  padding: 20px;
  width: calc(100% - 44px);
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

input[type="file"]:hover {
  border-color: #999;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: 500;
  color: #555;
}

#mosaic-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #d7dcdf;
  outline: none;
  margin: 20px 0 30px;
}

#mosaic-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4a4a4a;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

#mosaic-slider::-webkit-slider-thumb:hover {
  background: #2c2c2c;
  box-shadow: 0 0 0 8px rgba(74, 74, 74, 0.1);
}

#mosaic-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #4a4a4a;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: none;
}

#mosaic-slider::-moz-range-thumb:hover {
  background: #2c2c2c;
  box-shadow: 0 0 0 8px rgba(74, 74, 74, 0.1);
}

canvas {
  display: block;
  margin: 30px auto;
  border: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  max-width: 100%;
  height: auto;
}

button {
  background-color: #4a4a4a;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s ease;
  margin-top: 20px;
}

button:hover:not(:disabled) {
  background-color: #2c2c2c;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>
