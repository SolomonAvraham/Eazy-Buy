import Discord from '../../../assets/social_discord.png'
import Facebook from '../../../assets/social_facebook.png'
import Instagram from '../../../assets/social_instagram.png'
import Google from '../../../assets/social_google.png'
import Twitter from '../../../assets/social_twitter.png'

type Props = {
    isDark?: boolean
}

const SocialLinks = ({ isDark }: Props) => {
    return (
        <div className='flex justify-between items-center gap-7'>
            <a href="https://discord.com">
                <img
                    className={`${isDark ? "brightness-0" : ""} hover:opacity-50`}
                    src={Discord}
                    alt="discord"
                />
            </a>
            <a href="https://Facebook.com">
                <img
                    className={`${isDark ? "brightness-0" : ""} hover:opacity-50`}
                    src={Facebook}
                    alt="facebook"
                />
            </a>
            <a href="https://Instagram.com">
                <img
                    className={`${isDark ? "brightness-0" : ""} hover:opacity-50`}
                    src={Instagram}
                    alt="instagram"
                />
            </a>
            <a href="https://Google.com">
                <img
                    className={`${isDark ? "brightness-0" : ""} hover:opacity-50`}
                    src={Google}
                    alt="google"
                />
            </a>
            <a href="https://Twitter.com">
                <img
                    className={`${isDark ? "brightness-0" : ""} hover:opacity-50`}
                    src={Twitter}
                    alt="twitter"
                />
            </a>
        </div>
    )
}

export default SocialLinks
