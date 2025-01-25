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
.app {
  text-align: center;
  margin: 20px;
}

canvas {
  display: block;
  margin: 20px auto;
  border: 1px solid #ccc;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

#mosaic-slider {
  margin: 20px 0;
  width: 80%;
}
</style>
