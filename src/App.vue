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
        max="50"
        v-model="blockSize"
        @input="applyMosaic"
      />
    </div>
    
    <!-- プレビューキャンバス -->
    <canvas ref="canvas" style="max-width: 100%;"></canvas>
    
    <!-- ダウンロードボタン -->
    <button v-if="originalImage" @click="downloadImage">画像をダウンロード</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      originalImage: null, // 元画像オブジェクト
      blockSize: 10,       // 初期モザイク強度
    };
  },
  methods: {
    // 画像ファイルのアップロード
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          this.originalImage = img;

          // キャンバスの設定
          const canvas = this.$refs.canvas;
          canvas.width = img.width;
          canvas.height = img.height;

          // 元画像を描画
          this.applyMosaic();
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    // モザイクを適用
    applyMosaic() {
      if (!this.originalImage) return;

      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      // 元画像を再描画
      ctx.drawImage(this.originalImage, 0, 0, canvas.width, canvas.height);

      // 画像データを取得
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // モザイク強度（ブロックサイズ）
      const blockSize = parseInt(this.blockSize);

      // モザイク処理
      for (let y = 0; y < canvas.height; y += blockSize) {
        for (let x = 0; x < canvas.width; x += blockSize) {
          // ブロックの左上のピクセルの色を取得
          const i = (y * canvas.width + x) * 4;
          const red = data[i];
          const green = data[i + 1];
          const blue = data[i + 2];

          // ブロック内のピクセルを同じ色に設定
          for (let dy = 0; dy < blockSize; dy++) {
            for (let dx = 0; dx < blockSize; dx++) {
              const nx = x + dx;
              const ny = y + dy;

              // キャンバスの範囲外に出ないように制限
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

      // キャンバスに更新
      ctx.putImageData(imageData, 0, 0);
    },

    // 加工した画像をダウンロード
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

#mosaic-slider {
  margin: 20px 0;
  width: 80%;
}
</style>
