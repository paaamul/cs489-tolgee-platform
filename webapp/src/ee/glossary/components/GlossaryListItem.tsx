import { Box, Grid, styled, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { LINKS, PARAMS } from 'tg.constants/links';
import React from 'react';
import { components } from 'tg.service/apiSchema.generated';
import { T } from '@tolgee/react';
import { CircledLanguageIconList } from 'tg.component/languages/CircledLanguageIconList';
import { languageInfo } from '@tginternal/language-util/lib/generated/languageInfo';
import { GlossaryListItemMenu } from 'tg.ee.module/glossary/components/GlossaryListItemMenu';
import { usePreferredOrganization } from 'tg.globalContext/helpers';

type SimpleGlossaryWithStatsModel =
  components['schemas']['SimpleGlossaryWithStatsModel'];

const StyledContainer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 70px;
  grid-template-areas: 'name projects languages controls';
  padding: ${({ theme }) => theme.spacing(1.5, 2.5)};
  align-items: center;
  cursor: pointer;
  tab-index: 0;
  background-color: ${({ theme }) => theme.palette.background.default};
  @container (max-width: 599px) {
    grid-gap: ${({ theme }) => theme.spacing(1, 2)};
    grid-template-columns: 1fr 1fr 70px;
    grid-template-areas:
      'name      projects  controls'
      'languages languages languages';
  }
`;

const StyledName = styled('div')`
  grid-area: name;
  display: flex;
  overflow: hidden;
  margin-right: ${({ theme }) => theme.spacing(2)};
  @container (max-width: 599px) {
    margin-right: 0px;
  }
`;

const StyledProjects = styled('div')`
  grid-area: projects;
  display: flex;
  overflow: hidden;
  margin-right: ${({ theme }) => theme.spacing(2)};
  @container (max-width: 599px) {
    margin-right: 0px;
  }
`;

const StyledLanguages = styled('div')`
  grid-area: languages;
  @container (max-width: 599px) {
    justify-content: flex-start;
  }
`;

const StyledControls = styled('div')`
  grid-area: controls;
`;

const StyledNameText = styled(Typography)`
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
`;

type Props = {
  glossary: SimpleGlossaryWithStatsModel;
};

export const GlossaryListItem: React.VFC<Props> = ({ glossary }) => {
  const { preferredOrganization } = usePreferredOrganization();

  const history = useHistory();
  const languageTag = glossary.baseLanguageTag;
  const languageData = languageInfo[languageTag];
  const languages = [
    {
      base: true,
      flagEmoji: languageData?.flags?.[0] || '',
      id: 0,
      name: languageData?.englishName || languageTag,
      originalName: languageData?.originalName || languageTag,
      tag: languageTag,
    },
  ];

  return (
    <StyledContainer
      role="button"
      data-cy="glossary-list-item"
      onClick={() =>
        history.push(
          LINKS.ORGANIZATION_GLOSSARY.build({
            [PARAMS.GLOSSARY_ID]: glossary.id,
            [PARAMS.ORGANIZATION_SLUG]: preferredOrganization?.slug || '',
          })
        )
      }
    >
      <StyledName>
        <StyledNameText variant="h3">{glossary.name}</StyledNameText>
      </StyledName>
      <StyledProjects>
        <Typography variant="body1">
          {glossary.assignedProjectsCount === 1 ? (
            glossary.firstAssignedProjectName
          ) : glossary.assignedProjectsCount === 0 ? (
            <T keyName="glossary_list_assigned_projects_empty" />
          ) : (
            <T
              keyName="glossary_list_assigned_projects_count"
              params={{
                count: glossary.assignedProjectsCount.toString(),
              }}
            />
          )}
        </Typography>
      </StyledProjects>
      <StyledLanguages data-cy="glossary-list-languages">
        <Grid container>
          <CircledLanguageIconList languages={languages} />
        </Grid>
      </StyledLanguages>
      <StyledControls>
        <Box width="100%" display="flex" justifyContent="flex-end">
          <GlossaryListItemMenu glossary={glossary} />
        </Box>
      </StyledControls>
    </StyledContainer>
  );
};
