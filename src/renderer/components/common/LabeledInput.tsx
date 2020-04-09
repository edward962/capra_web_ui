import React, { ChangeEvent, FC } from 'react'
import {
  StyledInput,
  StyledLabel,
} from '~components/common/LabeledInput.styles'

interface LabeledInputProps {
  value: string
  label: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  type?: string
}

export const LabeledInput: FC<LabeledInputProps> = ({
  value,
  onChange,
  label,
  type,
}) => {
  return (
    <div>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput type={type || 'text'} value={value} onChange={onChange} />
    </div>
  )
}
