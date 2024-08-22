<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

router.replace({
  path: '/' + route.params.path as string,
  query: route.query
})

</script>