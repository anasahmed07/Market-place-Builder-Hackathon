import InputGroup from '../ui/inputgroup'
import { Search } from 'lucide-react'

const SearchBox = () => {
    return (
        <InputGroup className="bg-[#F0F0F0]">
            <InputGroup.Text>
                <Search />
            </InputGroup.Text>
            <InputGroup.Input
                type="search"
                name="search"
                placeholder="Search for products..."
                className="bg-transparent placeholder:text-black/40"
            />
        </InputGroup>
    )
}

export default SearchBox