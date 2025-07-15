import * as React from 'react';
import {useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import useSWR from "swr";

const articleInfo = [
  {
    tag: 'Engineering',
    title: 'The future of AI in software engineering',
    description:
      'Artificial intelligence is revolutionizing software engineering. Explore how AI-driven tools are enhancing development processes and improving software quality.',
    authors: [
      {name: 'Remy Sharp', avatar: '/logo192.png'},
      {name: 'Travis Howard', avatar: '/logo192.png'},
    ],
  },
  {
    tag: 'Product',
    title: 'Driving growth with user-centric product design',
    description:
      'Our user-centric product design approach is driving significant growth. Learn about the strategies we employ to create products that resonate with users.',
    authors: [{name: 'Erica Johns', avatar: '/logo192.png'}],
  },
  {
    tag: 'Design',
    title: 'Embracing minimalism in modern design',
    description:
      'Minimalism is a key trend in modern design. Discover how our design team incorporates minimalist principles to create clean and impactful user experiences.',
    authors: [{name: 'Kate Morrison', avatar: '/logo192.png'}],
  },
  {
    tag: 'Company',
    title: 'Cultivating a culture of innovation',
    description:
      'Innovation is at the heart of our company culture. Learn about the initiatives we have in place to foster creativity and drive groundbreaking solutions.',
    authors: [{name: 'Cindy Baker', avatar: '/logo192.png'}],
  },
  {
    tag: 'Engineering',
    title: 'Advancing cybersecurity with next-gen solutions',
    description:
      'Our next-generation cybersecurity solutions are setting new standards in the industry. Discover how we protect our clients from evolving cyber threats.',
    authors: [
      {name: 'Agnes Walker', avatar: '/logo192.png'},
      {name: 'Trevor Henderson', avatar: '/logo192.png'},
    ],
  },
  {
    tag: 'Product',
    title: 'Enhancing customer experience through innovation',
    description:
      'Our innovative approaches are enhancing customer experience. Learn about the new features and improvements that are delighting our users.',
    authors: [{name: 'Travis Howard', avatar: '/logo192.png'}],
  },
  {
    tag: 'Engineering',
    title: 'Pioneering sustainable engineering solutions',
    description:
      "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
    authors: [
      {name: 'Agnes Walker', avatar: '/logo192.png'},
      {name: 'Trevor Henderson', avatar: '/logo192.png'},
    ],
  },
  {
    tag: 'Product',
    title: 'Maximizing efficiency with our latest product updates',
    description:
      'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
    authors: [{name: 'Travis Howard', avatar: '/logo192.png'}],
  },
  {
    tag: 'Design',
    title: 'Designing for the future: trends and insights',
    description:
      'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
    authors: [{name: 'Kate Morrison', avatar: '/logo192.png'}],
  },
  {
    tag: 'Company',
    title: "Our company's journey: milestones and achievements",
    description:
      "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
    authors: [{name: 'Cindy Baker', avatar: '/logo192.png'}],
  },
];

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

const TitleTypography = styled(Typography)(({theme}) => ({
  position: 'relative',
  textDecoration: 'none',
  '&:hover': {cursor: 'pointer'},
  '& .arrow': {
    visibility: 'hidden',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },
  '&:hover .arrow': {
    visibility: 'visible',
    opacity: 0.7,
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '3px',
    borderRadius: '8px',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    width: 0,
    height: '1px',
    bottom: 0,
    left: 0,
    backgroundColor: (theme.vars || theme).palette.text.primary,
    opacity: 0.3,
    transition: 'width 0.3s ease, opacity 0.3s ease',
  },
  '&:hover::before': {
    width: '100%',
  },
}));

type IAuthor = { name: string; avatar: string }

function Author({authors}: { authors: IAuthor[] }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center'}}
      >
        <AvatarGroup max={3}>
          {authors.map((author, index) => (
            <Avatar
              key={index}
              alt={author.name}
              src={author.avatar}
              sx={{width: 24, height: 24}}
            />
          ))}
        </AvatarGroup>
        <Typography variant="caption">
          {authors.map((author) => author.name).join(', ')}
        </Typography>
      </Box>
      <Typography variant="caption">July 14, 2021</Typography>
    </Box>
  );
}

type Post = {
  "id": number,
  "category": string,
  "description": string,
  "tag": string,
  "title": string,
  "text": string,
  "date": string,
  "authors": IAuthor[]
}

export default function Latest() {
  const {data , isLoading, error} = useSWR<{ posts: Post[] }>('/list.json');
  useEffect(() => {
    console.log({data})
  }, [data])
  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null,
  );

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };
  if (error) {
    return <div>'errrror'</div>;
  }

  if (isLoading) {
    return <div>'loading'</div>;
  }

  if (!data) {
    return  <pre>no data</pre>
  }

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Latest
      </Typography>
      <Grid container spacing={8} columns={12} sx={{my: 4}}>
        {data.posts?.map((article, index) => <Grid key={index} size={{xs: 12, sm: 6}}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 1,
                height: '100%',
              }}
            >
              <Typography gutterBottom variant="caption" component="div">
                {article.tag}
              </Typography>
              <TitleTypography
                gutterBottom
                variant="h6"
                onFocus={() => handleFocus(index)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === index ? 'Mui-focused' : ''}
              >
                {article.title}
                <NavigateNextRoundedIcon
                  className="arrow"
                  sx={{fontSize: '1rem'}}
                />
              </TitleTypography>
              <StyledTypography variant="body2" color="text.secondary" gutterBottom>
                {article.text}
              </StyledTypography>

              <Author authors={article.authors}/>
            </Box>
          </Grid>)}
      </Grid>
      <Box sx={{display: 'flex', flexDirection: 'row', pt: 4}}>
        <Pagination hidePrevButton hideNextButton count={10} boundaryCount={10}/>
      </Box>
    </div>
  );
}
