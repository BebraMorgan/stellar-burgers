import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '@store';
import { useIngredients } from '@hooks/useIngredients';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getIngredientSelectorById } = useIngredients();

  if (!id) {
    return <div>Идентификатор ингредиента не указан</div>;
  }

  const ingredientData = useSelector(getIngredientSelectorById(id));

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
