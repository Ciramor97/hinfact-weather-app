# PR: Use v-model for Searchbar and add tests (issue #1)

This branch replaces the previous defineExpose/ref pattern with a proper v-model binding for the Searchbar component and adds unit tests for the component using Vitest.

Files changed:
- src/components/Searchbar.vue: expose value through v-model:queryStr (emits update:queryStr)
- src/App.vue: use searchQuery ref and bind with <Searchbar v-model:queryStr="searchQuery" />
- package.json: add test script and devDependencies for vitest + @vue/test-utils
- tests/components/Searchbar.spec.ts: unit test for Searchbar component

This commit addresses issue #1: "defineModel" by moving to a model-based API between parent and child.
