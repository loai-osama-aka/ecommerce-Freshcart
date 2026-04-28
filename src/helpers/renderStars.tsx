import { Star } from "lucide-react"
import { FaRegStarHalfStroke } from "react-icons/fa6"

// render 5 stars
export const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <Star key={i} className='h-4 w-4 fill-yellow-400 text-yellow-400' />
        )
    }
    if (hasHalfStar) {
        stars.push(
            <FaRegStarHalfStroke key={'half'} className='h-4 w-4 fill-yellow-400 text-yellow-400' />
        )
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars.push(<Star key={`empty-${i}`} className='h-4 w-4 text-gray-300' />)
    }

    return stars
}