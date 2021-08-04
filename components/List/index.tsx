import { useState } from 'react';
import styled from 'styled-components';
import Carbon from '../Carbon';


// Import External Components
import Item from './Item';

// Import Styled Components
import { ListContainer } from './List.atoms';
import {
    ListItem,
} from './Item.atoms';
import { Product } from '../../types/Product';

// Styled Components
const SRT = styled.span`
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  word-wrap: normal !important;
`;

const AdContainer = styled(ListItem)`
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 0;

    #carbonads {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    #carbonads {
        display: flex;
        max-width: 330px;
        background-color: hsl(0, 0%, 98%);
        box-shadow: 0 1px 4px 1px hsla(0, 0%, 0%, .1);
        min-height: 125px;
        margin-right: auto;
        margin-left: auto;
    }

    #carbonads a {
        color: inherit;
        text-decoration: none !important;
        border: none !important;
    }

    #carbonads a:hover {
        color: inherit;
    }

    #carbonads span {
        position: relative;
        display: block;
        overflow: hidden;
    }

    #carbonads .carbon-wrap {
        display: flex;
    }

    .carbon-img {
        display: block;
        margin: 0;
        line-height: 1;
    }

    .carbon-img img {
        
    }

    .carbon-text {
        font-size: 13px;
        padding: 10px;
        padding-left: 10px !important;
        display: flex !important;
        align-items: center !important;
        line-height: 1.5;
        text-align: left;
    }

    .carbon-poweredby {
        display: block;
        padding: 8px 10px;
        background: repeating-linear-gradient(-45deg, transparent, transparent 5px, hsla(0, 0%, 0%, .025) 5px, hsla(0, 0%, 0%, .025) 10px) hsla(203, 11%, 95%, .4);
        text-align: center;
        text-transform: uppercase;
        letter-spacing: .5px;
        font-weight: 600;
        font-size: 9px;
        line-height: 1;
    }
    #carbonads + a {
        display: none !important;
    }
`;

const AdPlaceholder = styled.a`
    background-color: hsl(0, 0%, 98%);
    height: 125px;
    width: 330px;
    border-bottom: 0;
    display: flex; align-items: center; justify-content: center;
    text-align: center;
    font-size: 0.9rem;
    img {
        height: 40px;
        width: 40px;
        margin-bottom: 0.5rem;
    }
    & > div {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }
`;

const FollowerCount = () => {
    const [count, _updateCount] = useState<(boolean | number)>(false);

    /*
        This used to fetch the follower count from a private Twitter API, but it now fails now with a CORS error.

        The endpoint is:
            https://cdn.syndication.twimg.com/widgets/followbutton/info.json?screen_names=killedbygoogle
        Which currently sends the header:
            access-contol-allow-origin: platform.twitter.com

        To bring this back, we'd probably need to use the official Twitter API. Maybe not worth it for an Ad fallback.
    */

    return (
        <span>{(count) ? count.toLocaleString('en') : 'a bunch of'}</span>
    )
};

export const FallbackAd = () => <AdPlaceholder href="https://twitter.com/killedbygoogle" target="_blank" rel="noopener noreferrer">
    <div>
        <div>
            <img src="twitter-blue.svg" alt="Twitter" />
        </div>
        <div>Join <FollowerCount /> others and follow<br /> @killedbygoogle on Twitter.</div>
    </div>
</AdPlaceholder>;

const showAd = () => {
    if (process.env.NODE_ENV === 'production')
        return (
            <Carbon
                name="kbg-carbon"
                placement="killedbygooglecom"
                serve="CK7I653N"
                fallback={FallbackAd}
            />
        );
    return <FallbackAd />
};

type Props = {
    items: Product[]
}

const List: React.FC<Props> = ({ items }) => (
    <ListContainer>
        <AdContainer>
            <SRT>Advertisement</SRT>
            {showAd()}
        </AdContainer>
        {items.map(item => (
            <Item key={item.name} {...item} />
        ))}
    </ListContainer>
);


export default List;