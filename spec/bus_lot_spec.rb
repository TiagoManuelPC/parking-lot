require 'bus_lot'

describe Bus_Lot do
subject(:bus_lot) {Bus_Lot.new}

it 'has spaces for cars' do
expect(bus_lot.spaces).to eq []
end

end