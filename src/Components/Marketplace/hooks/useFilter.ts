import { create } from 'zustand';

const useFilter = create(set => ({
  filter: 'price',
  order: 'desc',

  setFilter: (_filter: any) => {
    set({ filter: _filter });
  },
  setOrder: (_order: any) => {
    set({ order: _order });
  },
}));

export default useFilter;
