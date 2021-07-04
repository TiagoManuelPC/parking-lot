require 'handicap_lot'

describe Handicap_Lot do
subject(:handicap_lot) {Handicap_Lot.new}

it 'has spaces for handicaps' do
expect(handicap_lot.spaces).to eq []
end

end