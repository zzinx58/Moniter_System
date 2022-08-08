<link rel="stylesheet" href="../assets/styles/mixins.scss">
<template>

<!--  &lt;!&ndash;  windi继承tailwind，可以直接用&ndash;&gt;-->
<!--  &lt;!&ndash;  test&ndash;&gt;-->
<!--  <div class="test-global">Test</div>-->
<!--  <a href="https://heroicons.com/">svg图标资源</a>-->


  <!--  Navigation-->
  <header class="NavCateTeam-style">
    <div class="Nav-container-2layer">
      <a class="Nav-3layer-left-iconAndTile">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
             stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
             class="Nav-3layer-left-iconAndTile-svg" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span class="ml-3 text-xl">Header-2-Navigation</span>
      </a>
      <nav
          class="Nav-3layer-NavtionOption">
        <a class="Nav-3layer-NavtionOption-text" href="https://tailblocks.cc/">Navigation-Style in Tailblocks</a>
        <a class="Nav-3layer-NavtionOption-text">Second Link</a>
        <a class="Nav-3layer-NavtionOption-text">Third Link</a>
        <a class="Nav-3layer-NavtionOption-text">Fourth Link</a>
      </nav>
      <button
          class="Nav-3layer-button">
        Button
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
             stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </header>
  <body>
  <!--  Category-->
  <section class="NavCateTeam-style">
    <div class="HeadTeam-container-2layer">
      <div class="Cate-3SumBlock">
        <!--        左-->
        <div class="Cate-div">
          <div class="Cate-div-imgAndDiv">
            <img class="Cate-img" src="https://pngimg.com/uploads/acorn/acorn_PNG37024.png" alt="blog">
            <div class="p-6">
              <h2 class="Cate-h2">CATEGORY</h2>
              <h1 class="Cate-h1">The Catalyzer</h1>
              <p class="Cate-p">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
                microdosing tousled waistcoat.</p>
              <div class="Cate-div-learnMoreAndIcon">
                <a class="Cate-LearnMore"
                   href="https://pngimg.com/">Learn More
                  <svg class="Cate-svg-Arrow" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"
                       stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
                <span
                    class="Cate-spanLeft">
                  <svg class="Cate-svg-eyeAndDisscussion" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
                     stroke-linejoin="round" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                  </svg>1.2K
                </span>
                <span class="Cate-spanRight">
                  <svg class="Cate-svg-eyeAndDisscussion" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
                     stroke-linejoin="round" viewBox="0 0 24 24">
                  <path
                      d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>6
                </span>
              </div>
            </div>
          </div>
        </div>
        <!--        中-->
        <div class="Cate-div">
          <div class="Cate-div-imgAndDiv">
            <img class="Cate-img" src="https://dummyimage.com/721x401"
                 alt="blog">
            <div class="p-6">
              <h2 class="Cate-h2">CATEGORY</h2>
              <h1 class="Cate-h1">The 400 Blows</h1>
              <p class="Cate-p">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
                microdosing tousled waistcoat.</p>
              <div class="Cate-div-learnMoreAndIcon">
                <a class="Cate-LearnMore">Learn More
                  <svg class="Cate-svg-Arrow" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"
                       stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
                <span class="Cate-spanLeft">
                <svg class="Cate-svg-eyeAndDisscussion" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
                     stroke-linejoin="round" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>1.2K
              </span>
                <span class="Cate-spanRight">
                <svg class="Cate-svg-eyeAndDisscussion" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
                     stroke-linejoin="round" viewBox="0 0 24 24">
                  <path
                      d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>6
              </span>
              </div>
            </div>
          </div>
        </div>
        <!--        右-->
        <div class="Cate-div">
          <div class="Cate-div-imgAndDiv">
            <img class="Cate-img" src="https://dummyimage.com/722x402"
                 alt="blog">
            <div class="p-6">
              <h2 class="Cate-h2">CATEGORY</h2>
              <h1 class="Cate-h1">Shooting Stars</h1>
              <p class="Cate-p">Photo booth fam kinfolk cold-pressed sriracha leggings jianbing
                microdosing tousled waistcoat.</p>
              <div class="Cate-div-learnMoreAndIcon">
                <a class="Cate-LearnMore">Learn More
                  <svg class="Cate-svg-Arrow" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"
                       stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
                <span
                    class="Cate-spanLeft">
                <svg class="Cate-svg-eyeAndDisscussion" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
                     stroke-linejoin="round" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>1.2K
              </span>
                <span class="Cate-spanRight">
                <svg class="Cate-svg-eyeAndDisscussion" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"
                     stroke-linejoin="round" viewBox="0 0 24 24">
                  <path
                      d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>6
              </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!--  Team-->
  <section class="NavCateTeam-style">
    <div class="HeadTeam-container-2layer">
      <div class="Team-topDiv">
        <h1 class="Team-topDiv-h1">Our Team</h1>
        <p class="Team-topDiv-p">
          Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke farm-to-table.
          Franzen you probably haven't heard of them.</p>
      </div>
      <div class="Team-bottomDiv">
        <div class="Team-bottomDiv-sumDiv">
          <div class="Team-bottomDiv-sumDiv-nextDiv">
            <img alt="team"
                 class="Team-bottomDiv-img"
                 src="https://dummyimage.com/80x80/13541a/ffffff&text=aaa">
            <div class="flex-grow">
              <h2 class="Team-bottomDiv-h2">Holden Caulfield</h2>
              <p class="text-gray-500">UI Designer</p>
            </div>
          </div>
        </div>
        <div class="Team-bottomDiv-sumDiv">
          <div class="Team-bottomDiv-sumDiv-nextDiv">
            <img alt="team" class="Team-bottomDiv-img"
                 src="https://dummyimage.com/84x84">
            <div class="flex-grow">
              <h2 class="Team-bottomDiv-h2">Henry Letham</h2>
              <p class="text-gray-500">CTO</p>
            </div>
          </div>
        </div>
        <div class="Team-bottomDiv-sumDiv">
          <div class="Team-bottomDiv-sumDiv-nextDiv">
            <img alt="team" class="Team-bottomDiv-img"
                 src="https://dummyimage.com/88x88">
            <div class="flex-grow">
              <h2 class="Team-bottomDiv-h2">Oskar Blinde</h2>
              <p class="text-gray-500">Founder</p>
            </div>
          </div>
        </div>


        <div class="Team-bottomDiv-sumDiv">
          <div class="Team-bottomDiv-sumDiv-nextDiv">
            <img alt="team"
                 class="Team-bottomDiv-img"
                 src="https://dummyimage.com/80x80/13541a/ffffff&text=aaa">
            <div class="flex-grow">
              <h2 class="Team-bottomDiv-h2">Holden Caulfield</h2>
              <p class="text-gray-500">UI Designer</p>
            </div>
          </div>
        </div>
        <div class="Team-bottomDiv-sumDiv">
          <div class="Team-bottomDiv-sumDiv-nextDiv">
            <img alt="team" class="Team-bottomDiv-img"
                 src="https://dummyimage.com/84x84">
            <div class="flex-grow">
              <h2 class="Team-bottomDiv-h2">Henry Letham</h2>
              <p class="text-gray-500">CTO</p>
            </div>
          </div>
        </div>
        <div class="Team-bottomDiv-sumDiv">
          <div class="Team-bottomDiv-sumDiv-nextDiv">
            <img alt="team" class="Team-bottomDiv-img"
                 src="https://dummyimage.com/88x88">
            <div class="flex-grow">
              <h2 class="Team-bottomDiv-h2">Oskar Blinde</h2>
              <p class="text-gray-500">Founder</p>
            </div>
          </div>
        </div>



        <div class="Team-bottomDiv-sumDiv">
          <div class="Team-bottomDiv-sumDiv-nextDiv">
            <img alt="team"
                 class="Team-bottomDiv-img"
                 src="https://dummyimage.com/80x80/13541a/ffffff&text=aaa">
            <div class="flex-grow">
              <h2 class="Team-bottomDiv-h2">Holden Caulfield</h2>
              <p class="text-gray-500">UI Designer</p>
            </div>
          </div>
        </div>
        <div class="Team-bottomDiv-sumDiv">
          <div class="Team-bottomDiv-sumDiv-nextDiv">
            <img alt="team" class="Team-bottomDiv-img"
                 src="https://dummyimage.com/84x84">
            <div class="flex-grow">
              <h2 class="Team-bottomDiv-h2">Henry Letham</h2>
              <p class="text-gray-500">CTO</p>
            </div>
          </div>
        </div>
        <div class="Team-bottomDiv-sumDiv">
          <div class="Team-bottomDiv-sumDiv-nextDiv">
            <img alt="team" class="Team-bottomDiv-img"
                 src="https://dummyimage.com/88x88">
            <div class="flex-grow">
              <h2 class="Team-bottomDiv-h2">Oskar Blinde</h2>
              <p class="text-gray-500">Founder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </body>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useRouter} from "vue-router";
import {useUserStore} from "@/store/User";

export default defineComponent({
  name: "Windi",
  setup() {},
});
</script>


<style lang="scss" scoped>
.test-global {
  @include test-bg;
  height: $test-height;
}

.Nav-container-2layer {
  @include Nav-container-style
}

.HeadTeam-container-2layer {
  @include HeadTeam-container-style
}

.Nav-3layer-left-iconAndTile {
  @include Nav-iconAndTile-style
}

.Nav-3layer-left-iconAndTile-svg {
  @include Nav-iconAndTile-svg-style
}

.Nav-3layer-NavtionOption {
  @include Nav-NavgationOption-style;
  @include center-item;
}

.Nav-3layer-NavtionOption-text {
  @include Nav-NavtionOption-text-style
}

.Nav-3layer-button {
  @include Nav-button
}

//Category
//三个div总的那个Div的样式
.Cate-3SumBlock {
  @include Cate-sumblock-style
}

//其中一个div的样式
.Cate-div {
  @include Cate-div-style
}

.Cate-div-imgAndDiv {
  @include Cate-div-imgAndDiv-style
}

.Cate-img {
  @include Cate-img-style
}

.Cate-h2 {
  @include Cate-h2-style
}

.Cate-h1 {
  @include Cate-h1-style
}

.Cate-p {
  @include Cate-p-style
}

.Cate-div-learnMoreAndIcon {
  @include Cate-div-learnMoreAndIcon-style
}
.Cate-LearnMore {
  @include Cate-LearnMore-style
}

.Cate-svg-Arrow {
  @include Cate-svg-common;
  margin-left:$ml-2;
}
.Cate-svg-eyeAndDisscussion {
  @include Cate-svg-common;
  margin-right:$mr-1;
}
.Cate-spanLeft {
  @include Cate-spanLeft-style
}
.Cate-spanRight {
  @include Cate-spanRight-style
}


//Our Team块
.Team-topDiv{
  @include Team-topDiv-style
}
.Team-topDiv-h1 {
  @include Team-topDiv-h1-style
}
.Team-topDiv-p {
  @include  Team-topDiv-p-style
}
.Team-bottomDiv {
  @include Team-bottomDiv-style
}
.Team-bottomDiv-sumDiv {
  @include Team-bottomDiv-sumDiv-style
}
.Team-bottomDiv-sumDiv-nextDiv {
  @include Team-bottomDiv-sumDiv-nextDiv-style
}
.Team-bottomDiv-img {
  @include Team-bottomDiv-img-style
}
.Team-bottomDiv-h2 {
  @include Team-bottomDiv-h2-style
}

</style>
