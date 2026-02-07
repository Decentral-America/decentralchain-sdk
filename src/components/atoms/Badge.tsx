/**
 * Badge Component
 * Notification counts and status indicators
 * Migrated to Material-UI Chip (styled as Badge)
 */
import React from 'react';
import MuiChip, { ChipProps as MuiChipProps } from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

export interface BadgeProps extends Omit<MuiChipProps, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  dot?: boolean;
  outline?: boolean;
}

const StyledBadge = styled(MuiChip, {
  shouldForwardProp: (prop) => !['dot', 'outline'].includes(prop as string),
})<BadgeProps>(({ theme, variant, size, dot, outline }) => {
  const colorMap = {
    primary: theme.palette.primary.main,
    secondary: theme.palette.secondary.main,
    success: theme.palette.success.main,
    error: theme.palette.error.main,
    warning: theme.palette.warning.main,
    info: theme.palette.info.main,
  };

  const color = colorMap[variant || 'primary'];

  return {
    borderRadius: theme.shape.borderRadius * 4,
    fontWeight: theme.typography.fontWeightMedium,
    lineHeight: 1,
    height: size === 'small' ? 18 : size === 'large' ? 28 : 22,
    minWidth: size === 'small' ? 18 : size === 'large' ? 28 : 22,
    fontSize:
      size === 'small'
        ? theme.typography.caption.fontSize
        : size === 'large'
          ? theme.typography.body1.fontSize
          : theme.typography.body2.fontSize,
    padding: size === 'small' ? '2px 6px' : size === 'large' ? '6px 12px' : '4px 8px',
    backgroundColor: outline ? 'transparent' : color,
    color: outline ? color : 'white',
    border: outline ? `1px solid ${color}` : 'none',
    ...(dot && {
      padding: 0,
      width: 8,
      height: 8,
      minWidth: 8,
      borderRadius: '50%',
      '& .MuiChip-label': {
        display: 'none',
      },
    }),
  };
});

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
  return <StyledBadge ref={ref} {...props} />;
});

Badge.displayName = 'Badge';
