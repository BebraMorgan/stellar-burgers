import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useBurgerConstructor } from '@hooks/useBurgerConstructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const { removeIngredientByIndex, moveIngredientByIndex } =
      useBurgerConstructor();

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleClose={() => removeIngredientByIndex(index)}
        handleMoveUp={() => moveIngredientByIndex(index, index - 1)}
        handleMoveDown={() => moveIngredientByIndex(index, index + 1)}
      />
    );
  }
);
