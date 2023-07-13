import { mount } from '@vue/test-utils';
import GraficoValorAcumulado from '../../src/views/cedente/dashboard/components/GraficoValorAcumulado.vue';

describe('GraficoValorAcumulado', () => {
  it('renders the component', () => {
    const wrapper = mount(GraficoValorAcumulado, {
      propsData: {
        chartData: [
          {
            name: 'Valor acumulado no período',
            data: [
              { x: '01/01/2020', y: 100.0 },
              { x: '02/01/2020', y: 200.0 },
              { x: '03/01/2020', y: 300.0 },
              { x: '04/01/2020', y: 400.0 },
              { x: '05/01/2020', y: 50.0 },
            ],
          },
        ],
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'VueApexCharts' }).exists()).toBe(true);
  });
});
