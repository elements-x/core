
export default {
  title: 'Example/CSS Collections'
};

export const CircleInsideWithBoxShadow = () => /*html*/ `
<style>
  [has-blocks] > div { display: inline-block;}
  .circle-inside {
    background: blue;
    border-radius: 50%;
    width: 140px; 
    height: 140px;
  }
  .circle-inside:nth-child(2) {
    box-shadow: inset 0 0 0 20px red; 
  }
  .circle-inside:nth-child(3) {
    box-shadow: inset 0 0 0 20px red, inset 0 0 0 40px yellow; 
  }
</style>
<div has-blocks>
  <div class="circle-inside"></div>
  <div class="circle-inside"></div>
  <div class="circle-inside"></div>
</div>
`;

export const CircleInsideWithBackground = () => /*html*/ `
  <style>
    [has-blocks] > div { display: inline-block;}
    .circle-inside-bg {
      width: 160px;
      height: 160px;
      border-radius: 50%;
      background-image: radial-gradient( circle at 50%, blue 0 80px);
    }
    .circle-inside-bg:nth-child(2) {
      background-image: radial-gradient( circle at 50%, blue 20px, yellow 0 80px);
    }
    .circle-inside-bg:nth-child(3) {
      background-image: radial-gradient( circle at 50%, blue 20px, yellow 0 40px, red 0 80px );
    }
    .circle-inside-bg:nth-child(4) {
      background-image: radial-gradient( circle at 50%, blue 20px, yellow 0 40px, red 0 60px, green 0 80px );
    }
  </style>
  <div has-blocks>
    <div class="circle-inside-bg"></div>
    <div class="circle-inside-bg"></div>
    <div class="circle-inside-bg"></div>
    <div class="circle-inside-bg"></div>
  </div>
`;

export const CircleOutsideWithBoxShadow = () => /*html*/ `
  <style>
    [has-blocks] > div { display: inline-block;}
    .circle-outside {
      margin: 0 40px;
      border-radius: 50%;
      width: 60px; 
      height: 60px;
      background: blue;
    }
    .circle-outside:nth-child(2) {
      box-shadow: 0 0 0 20px yellow;
    }
    .circle-outside:nth-child(3) {
      box-shadow: 0 0 0 20px yellow, 0 0 0 40px red;
    }
  </style>
  <div has-blocks style="padding: 20px">
    <div class="circle-outside"></div>
    <div class="circle-outside"></div>
    <div class="circle-outside"></div>
  </div>
`;

export const BorderRadius = () => /*html*/ `
  <style>
    [has-blocks] > div { display: inline-block;}
    .br { 
      width: 120px;
      height: 120px;
      box-sizing: border-box;
      background: blue;
    }
    .br:hover {
      border: 15px solid skyblue;
    }
    .br-1 { height: 60px; border-radius: 120px 120px 0 0; }
    .br-2 { height: 60px; border-radius: 0px 0px 120px 120px; }
    .br-3 { width: 60px;  border-radius: 0px 120px 120px 0; }
    .br-4 { width: 60px;  border-radius: 120px 0px 0px 120px; }
    .br-5 { width: 60px; height: 60px; border-radius: 100% 0 0 0;}
    .br-6 { width: 60px; height: 60px; border-radius: 0 100% 0 0;}
    .br-7 { width: 60px; height: 60px; border-radius: 0 0 100% 0;}
    .br-8 { width: 60px; height: 60px; border-radius: 0 0 0 100%;}
    .br-9 { border-radius: 50% 0 50% 0; }
    .br-a { border-radius: 50% 0 50% 50%; }
  </style>
  <div has-blocks>
    <div class="br-1 br"></div>
    <div class="br-2 br"></div>
    <div class="br-3 br"></div>
    <div class="br-4 br"></div>
    <div class="br-5 br"></div>
    <div class="br-6 br"></div>
    <div class="br-7 br"></div>
    <div class="br-8 br"></div>
    <div class="br-9 br"></div>
    <div class="br-a br"></div>
  </div>
`;

export const ConicGradient = () => /*html*/ `
  <style>
    [has-blocks] > div { display: inline-block;}
    .cr { 
      width: 120px;
      height: 120px;
      box-sizing: border-box;
      border-radius: 50%;
      background: conic-gradient(red, orange);
    }
    .cr-1 { background: conic-gradient(red, blue); }
    .cr-2 { background: conic-gradient(red 25%, blue 0 75%, red 0); }
    .cr-3 { background: conic-gradient(red 0, blue 0 50%, red 0) }
    .cr-4 { background: conic-gradient(red 25%, green 0); }
    .cr-5 { background: conic-gradient(red 25%, green 0 50%, blue 0); }
    .cr-6 { background: conic-gradient(red 25%, green 0 50%, blue 0 75%, yellow 0); }
  </style>
  <div has-blocks>
    <div class="cr-1 cr"></div>
    <div class="cr-2 cr"></div>
    <div class="cr-3 cr"></div>
    <div class="cr-4 cr"></div>
    <div class="cr-5 cr"></div>
    <div class="cr-6 cr"></div>
  </div>
`;

export const LinearGradient = () => /*html*/ `
  <style>
    [has-blocks] > div { display: inline-block;}
    .lr { 
      width: 120px;
      height: 120px;
      box-sizing: border-box;
      border-radius: 50%;
      background: conic-gradient(red, orange);
    }
    .lr-1 { background: linear-gradient(to bottom right, red, red 50%, blue 0); }
    .lr-2 { background: linear-gradient(to bottom, black 33.33%, red 33.33%, red 66.66%, yellow 0); }
    .lr-3 { background: linear-gradient(to right, blue 33.33%, white 33.33%, white 66.66%, red 0); }
    .lr-4 { background: repeating-linear-gradient( to bottom, red, red 20px, white 20px, white 30px); }
    .lr-5 { background: repeating-linear-gradient( to bottom right, red, red 20px, white 20px, white 30px) }
  </style>
  <div has-blocks>
    <div class="lr-1 lr"></div>
    <div class="lr-2 lr"></div>
    <div class="lr-3 lr"></div>
    <div class="lr-4 lr"></div>
    <div class="lr-5 lr"></div>
  </div>
`;

export const ClipPath = () => /*html*/ `
  <style>
    [has-blocks] > div { display: inline-block;}
    .cp { 
      width: 120px;
      height: 120px;
      background: url(//picsum.photos/120/120);
    }
    .cp-1 { 
      font-size: 120px;
      font-family: Impact, sans-serif;
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      -webkit-text-stroke: 2px #000;
    }
    .cp-2 { clip-path: polygon(100% 0, 0 100%, 0 0); }
    .cp-3 { clip-path: polygon(50% 0, 0 100%, 100% 100%); }
    .cp-4 { clip-path: circle(100% at 0 100%); }
    .cp-5 { clip-path: circle(50% at 100% 50%); }
  </style>
  <div has-blocks>
    <div class="cp-1 cp">HI</div>
    <div class="cp-2 cp"></div>
    <div class="cp-3 cp"></div>
    <div class="cp-4 cp"></div>
    <div class="cp-5 cp"></div>
  </div>
`;


export const MixBlendMode = () => /*html*/ `
  <style>
    [has-blocks] > div { display: inline-block;}
    .mbm-1 {
      width: 200px;
      height: 200px;
      position: relative;
    }

    .mbm-1 .text { 
      position: absolute;
      inset: 0 0 0 0;
      font-family: Impact;
      font-size: 200px;

      color: #000;
      background-color: #FFF;
      mix-blend-mode: screen; /* black -> org, white -> white */
      /* mix-blend-mode: multiply; // black -> black, white -> org */
    }

    .mbm-1 .video { 
      position: absolute;
      inset: 0 0 0 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    } 
  </style>
  <div class="mbm-1">
    <video class="video" autoplay="" loop="" width="100%" preload="true" muted="true">
      <source src="//sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4">
    </video>
    <div class="text">HI</div>
  </div>
`;

export const TagGukGi = () => /*html*/ `
  <style>
    [inline-flex] > div { display: inline-flex;}
    .custom-1 {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: linear-gradient(red 0 50%, blue 0 50%);
      position: relative;
      transform: rotate(25deg);
      margin-right: 1em;
    }
    .custom-1:before {
      content: '';
      position: absolute;
      top: 30px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: red;
      box-shadow: 60px 0 0 blue;
      margin-right: 1em;
    }

    .custom-2 {
      width: 150px;
      height: 100px;
      background: repeating-linear-gradient(
        #000,#000 23.33px, #FFF 0 38.33px
      );
      position: relative;
      display: flex;
      justify-content: center;
      margin-right: 1em;
    }
    .custom-2:nth-child(odd) {
      opacity: .5;
    }

    .custom-2:not(.three):after {
      content: '';
      background: #FFF;
      width: 15px;
      height: 24px;
      position: absolute;
    }
    .custom-2.four:after {
      top: 38px;
    }
    .custom-2.five:after {
      box-shadow: 0 76px 0 #FFF;
    }
    .custom-2.six:after {
      box-shadow: 0 38px 0 #FFF, 0 76px 0 #FFF;
    }
  </style>

  <div inline-flex>
    <div class="custom-1"></div>
    <div class="custom-2 three"></div>
    <div class="custom-2 four"></div>
    <div class="custom-2 five"></div>
    <div class="custom-2 six"></div>
  </div>
`;
