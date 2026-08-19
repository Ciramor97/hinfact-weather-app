import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Searchbar from '../../src/components/Searchbar.vue'

describe('Searchbar', () => {
  it('updates v-model when typing and emits search on button click and Enter', async () => {
    const wrapper = mount(Searchbar, {
      props: { queryStr: '' }
    })

    const input = wrapper.find('input')
    await input.setValue('Paris')

    expect(wrapper.emitted('update:queryStr')).toBeTruthy()
    expect(wrapper.emitted('update:queryStr')?.[0]).toEqual(['Paris'])

    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')?.[0]).toEqual(['Paris', undefined])

    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('search')?.length).toBeGreaterThan(1)
  })
})
