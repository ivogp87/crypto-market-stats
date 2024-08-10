import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View } from 'react-native';

import themedStyles from './styles';
import { useStyles } from '../../hooks';

import DividedRow from '../DividedRow';
import Link from '../Link';
import Heading from '../Heading';
import TextBlock from '../TextBlock';
import LinksSection from '../LinksSection';

const AboutCoin = ({ description, links }) => {
  const styles = useStyles(themedStyles);

  const {
    homepage,
    blockchain_site,
    official_forum_url,
    twitter_screen_name,
    facebook_username,
    subreddit_url,
  } = links || {};

  // filter out empty strings from the links arrays
  const homepageLinks = homepage?.filter((link) => !!link);
  const blockchainLinks = blockchain_site?.filter((link) => !!link);
  const forumLinks = official_forum_url?.filter((link) => !!link);

  return (
    <ScrollView>
      {(homepageLinks ||
        blockchainLinks ||
        forumLinks ||
        twitter_screen_name ||
        facebook_username ||
        subreddit_url) && (
        <>
          <Heading iconName="link">Links</Heading>
          <View style={styles.linksContainer}>
            <LinksSection title="Homepage" linkList={homepageLinks} />
            <LinksSection title="Forum" linkList={forumLinks} />
            <LinksSection title="Blockchain" linkList={blockchainLinks} />
            {!!twitter_screen_name && (
              <DividedRow textLeft="Twitter">
                <Link href={`https://twitter.com/${twitter_screen_name}`}>
                  {`twitter.com/${twitter_screen_name}`}
                </Link>
              </DividedRow>
            )}
            {!!facebook_username && (
              <DividedRow textLeft="Facebook">
                <Link href={`https://www.facebook.com/${facebook_username}`}>
                  {`facebook.com/${facebook_username}`}
                </Link>
              </DividedRow>
            )}
            {!!subreddit_url && (
              <DividedRow textLeft="Reddit">
                <Link href={subreddit_url}>{subreddit_url.replace('https://www.', '')}</Link>
              </DividedRow>
            )}
          </View>
        </>
      )}

      {!!description && (
        <>
          <Heading iconName="information-circle-outline">Description</Heading>
          <TextBlock style={styles.description}>{description}</TextBlock>
        </>
      )}
    </ScrollView>
  );
};

AboutCoin.propTypes = {
  description: PropTypes.string,
  links: PropTypes.shape({
    homepage: PropTypes.arrayOf(PropTypes.string),
    blockchain_site: PropTypes.arrayOf(PropTypes.string),
    official_forum_url: PropTypes.arrayOf(PropTypes.string),
    twitter_screen_name: PropTypes.string,
    facebook_username: PropTypes.string,
    subreddit_url: PropTypes.string,
  }),
};

export default AboutCoin;
