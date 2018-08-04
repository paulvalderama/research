<template>
  <div class="flex mt2 items-start">
    <div class="flex items-center">
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
import { timeDifferenceForDate } from "../utils";
import { GC_USER_ID, GC_USER_NAME } from "../constants/settings";
import { ALL_LINKS_QUERY, CREATE_VOTE_MUTATION } from "../constants/graphql";

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
    voteForLink() {
      const userId = localStorage.getItem(GC_USER_ID);
      const voterIds = this.link.votes.map(vote => vote.user.id);
      const userName = localStorage.getItem(GC_USER_NAME);
      if (voterIds.includes(userId)) {
        alert(`User (${userId}) already voted for this link.`);
        return;
      }
      const linkId = this.link.id;
      this.$apollo.mutate({
        mutation: CREATE_VOTE_MUTATION,
        variables: {
          userId,
          linkId
        },
        update: (store, { data: { createVote } }) => {
          this.updateStoreAfterVote(store, createVote, linkId);
          var styles = [
            "background: linear-gradient(#D33106, #571402)",
            "border: 1px solid #3E0E02",
            "display: block",
            "text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3)",
            "box-shadow: 0 1px 0 rgba(255, 255, 255, 0.4) inset, 0 5px 3px -5px rgba(0, 0, 0, 0.5), 0 -13px 5px -10px rgba(255, 255, 255, 0.4) inset",
            "line-height: 40px",
            "text-align: center",
            "font-weight: bold",
            "font-size: 14px"
          ].join(";");

          console.log(
            `%c new state change: +++++${userName} added a vote! ${data}`,
            styles
          );
        }
      });
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
