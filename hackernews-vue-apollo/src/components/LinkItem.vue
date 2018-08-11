<template>
  <div class='flex mt2 items-start'>
    <div class='flex items-center'>
      <span class="gray">{{linkNumber}}.</span>
      <div v-if="userId" class="ml1 gray f11 upvote" @click="voteForLink()">▲</div>
    </div>
    <div class="ml1">
      <a :href="link.url" class="link">{{link.description}} ({{link.url}})</a>
      <div class="f6 lh-copy gray">
        {{link.votes.length}} votes | by {{link.postedBy ? link.postedBy.name : 'Unknown'}} {{timeDifferenceForDate(link.createdAt)}}
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { timeDifferenceForDate } from '../utils'
import { GC_USER_ID } from '../constants/settings'
import { ALL_LINKS_QUERY, CREATE_VOTE_MUTATION } from '../constants/graphql'
import ApolloDev from '../utils/TimeTravel'


export default {
  name: "LinkItem",
  computed: {
    userId() {
      return this.$root.$data.userId;
    },
    linkNumber() {
      if (this.$route.path.includes("new")) {
        return (this.pageNumber - 1) * this.linksPerPage + (this.index + 1);
      } else {
        return this.index + 1;
      }
    }
  },
  props: ["link", "index"],
  methods: {
    timeDifferenceForDate,
    voteForLink () {
      const userId = localStorage.getItem(GC_USER_ID)
      const voterIds = this.link.votes.map(vote => vote.user.id)
      // const userName = localStorage.getItem(GC_USER_NAME)
      // disable limitations on vote for testing;
      // if (voterIds.includes(userId)) {
      //   alert(`User (${userId}) already voted for this link.`);
      //   return;
      // }
      const linkId = this.link.id;

      /* const _mutate = this.$apollo.mutate;

      this.$apollo.mutate = function(configObj) {
        console.log('before mutation: ', JSON.stringify())
        const output = _mutate.apply(this, arguments)
        const postMutation = output.then(res => console.log('after mutation: ', res.data))
        // console.log('after mutation: ', postMutation)
        // return output;
      },
      */
    //  console.log(typeof ApolloDev)
     console.log('dollarApollo in LinkItem: ', this)
     this.ApolloDev = ApolloDev.bind(this);
     this.ApolloDev({
        mutation: CREATE_VOTE_MUTATION,
        variables: {
          userId,
          linkId
        },
        update: (store, { data: { createVote } }) => {
          // eslint-disable-next-line
          const CSS_COLOR_NAMES = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"]
          this.updateStoreAfterVote(store, createVote, linkId)
          const randomColor = CSS_COLOR_NAMES[Math.floor((Math.random()) * CSS_COLOR_NAMES.length)]
          // eslint-disable-next-line
          // console.log(`%c ${userId} added a vote. store update: ${JSON.stringify(store.data, null, 2)}`, `color: ${randomColor}`)
        }
      })
      // .then(res => {
      //   console.log('=====apollo object=====: ', this.$apollo);
      //   console.log('=====state data post-mutation=====: ', res.data);
      // })
    },
    updateStoreAfterVote(store, createVote, linkId) {
      const data = store.readQuery({
        query: ALL_LINKS_QUERY
      });
      const votedLink = data.allLinks.find(link => link.id === linkId);
      votedLink.votes = createVote.link.votes;
      store.writeQuery({ query: ALL_LINKS_QUERY, data });
    }
  }
};
</script>

<style scoped>
.upvote {
  cursor: pointer;
}

.link {
  text-decoration: none;
  color: black;
}
</style>
