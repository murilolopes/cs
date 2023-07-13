import { mount, shallowMount } from '@vue/test-utils'
import CreditAcquirerSlider from '@/views/cedente/dashboard/components/CreditAcquirerSlider.vue'
import { BBadge } from 'bootstrap-vue';
import { BCardActions } from '@/@core/components/b-card-actions';
import VueApexCharts from 'vue-apexcharts';

describe('CreditAcquirerSlider.vue', () => {
  it("should render correctly", () => {
    const acquirerData = {
      tax: 1.85,
      logo: 'x'
    }

    const wrapper = shallowMount(CreditAcquirerSlider, { propsData: { acquirerData }})
    expect(wrapper.element).toMatchSnapshot();
  });

  it('Must show effective tax badge', () => {
    const acquirerData = {
      tax: 1.85,
      logo: 'z'
    }

    const wrapper = shallowMount(CreditAcquirerSlider, { propsData: { acquirerData }})

    const efectiveTaxBadge = wrapper.findComponent(BBadge)

    expect(efectiveTaxBadge.isVisible()).toBe(true)
    expect(efectiveTaxBadge.text()).toEqual('Taxa efetiva 1,85%')
  })

  it('Must not show effective tax badge', () => {
    const acquirerData = {
      logo: 'z'
    }

    const wrapper = shallowMount(CreditAcquirerSlider, { propsData: { acquirerData }})

    const efectiveTaxBadge = wrapper.findComponent(BBadge)

    expect(efectiveTaxBadge.isVisible()).toBe(false)
  })

  it('Must show a b-card-actions collapsed by default', () => {
    const acquirerData = {
      logo: 'z'
    }

    const wrapper = shallowMount(CreditAcquirerSlider, { propsData: { acquirerData }})

    const efectiveTaxBadge = wrapper.findComponent(BCardActions)

    expect(efectiveTaxBadge.props().collapsed).toBe(true)
  })
})
