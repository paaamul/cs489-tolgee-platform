import { components } from 'tg.service/apiSchema.generated';
import React, { ComponentProps, useState } from 'react';
import Box from '@mui/material/Box';
import { useField, useFormikContext } from 'formik';
import { useTranslate } from '@tolgee/react';
import { useApiInfiniteQuery } from 'tg.service/http/useQueryApi';
import { useDebounce } from 'use-debounce';
import { InfiniteMultiSearchSelect } from 'tg.component/searchSelect/InfiniteMultiSearchSelect';
import { MultiselectItem } from 'tg.component/searchSelect/MultiselectItem';
import { usePreferredOrganization } from 'tg.globalContext/helpers';

type SimpleProjectModel = components['schemas']['SimpleProjectModel'];
type SelectedProjectModel = {
  id: number;
  name: string;
};

type Props = {
  name: string;
  disabled?: boolean;
} & Omit<ComponentProps<typeof Box>, 'children'>;

export const AssignedProjectsSelect: React.VFC<Props> = ({
  name,
  disabled,
  ...boxProps
}) => {
  const { preferredOrganization } = usePreferredOrganization();
  const context = useFormikContext();
  const { t } = useTranslate();
  const [field, meta] = useField(name);
  const value = field.value as SelectedProjectModel[];
  // Formik returns an error as object - schema is incorrect...
  // Already reported by someone else here: https://github.com/jaredpalmer/formik/issues/3994
  const error =
    typeof meta.error === 'object' && meta.error !== null && 'id' in meta.error
      ? (meta.error as { id?: string }).id
      : undefined;

  const [search, setSearch] = useState('');
  const [searchDebounced] = useDebounce(search, 500);

  const query = {
    search: searchDebounced,
    size: 30,
  };
  const dataLoadable = useApiInfiniteQuery({
    url: '/v2/organizations/{id}/projects',
    method: 'get',
    path: { id: preferredOrganization!.id },
    query,
    options: {
      keepPreviousData: true,
      refetchOnMount: true,
      noGlobalLoading: true,
      getNextPageParam: (lastPage) => {
        if (
          lastPage.page &&
          lastPage.page.number! < lastPage.page.totalPages! - 1
        ) {
          return {
            path: { id: preferredOrganization!.id },
            query: {
              ...query,
              page: lastPage.page!.number! + 1,
            },
          };
        } else {
          return null;
        }
      },
    },
  });

  const data = dataLoadable.data?.pages.flatMap(
    (p) => p._embedded?.projects ?? []
  );

  const handleFetchMore = () => {
    if (dataLoadable.hasNextPage && !dataLoadable.isFetching) {
      dataLoadable.fetchNextPage();
    }
  };

  const setValue = (v: SelectedProjectModel[]) =>
    context.setFieldValue(name, v);
  const toggleSelected = (item: SimpleProjectModel) => {
    if (value.some((v) => v.id === item.id)) {
      setValue(value.filter((v) => item.id !== v.id));
      return;
    }
    const itemSelected = {
      id: item.id,
      name: item.name,
    };
    setValue([itemSelected, ...value]);
  };

  function renderItem(props: object, item: SimpleProjectModel) {
    const selected = value.some((v) => v.id === item.id);
    return (
      <MultiselectItem
        {...props}
        data-cy="assigned-projects-select-item"
        selected={selected}
        label={item.name}
        onClick={() => toggleSelected(item)}
      />
    );
  }

  function labelItem(item: SelectedProjectModel) {
    return item.name;
  }

  return (
    <Box data-cy="assigned-projects-select" {...boxProps}>
      <InfiniteMultiSearchSelect
        items={data}
        selected={value}
        queryResult={dataLoadable}
        itemKey={(item) => item.id}
        search={search}
        onClearSelected={() => setValue([])}
        onSearchChange={setSearch}
        onFetchMore={handleFetchMore}
        renderItem={renderItem}
        labelItem={labelItem}
        label={t('create_glossary_field_project')}
        error={meta.touched && error}
        searchPlaceholder={t('project_select_search_placeholder')}
        disabled={disabled}
      />
    </Box>
  );
};
