import React from 'react';
import styled from 'styled-components';

const AddressCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: auto;
  min-height: 80px;
  min-width: 220px;
  padding: 20px;
  font-size: 12px;
  border-radius: 4px;
  border: ${({ isPrimary }) =>
    isPrimary ? '2px solid blue' : '1px solid lightgrey'};
`;

// passing down setPrimaryAddress from parent to trigger render on update
export default function AddressCard({ address, setPrimaryAddress }) {
  const {
    street_number,
    street_address,
    city_name,
    state_abbrev_name,
    country_name,
    zipcode,
    domicile_type,
    is_primary,
  } = address || {};

  return (
    <AddressCardContainer isPrimary={is_primary} onClick={setPrimaryAddress}>
      <div>{`${street_number} ${street_address} (${domicile_type})`}</div>
      <div>{`${city_name}, ${state_abbrev_name}, ${zipcode}`}</div>
      <div>{country_name}</div>
    </AddressCardContainer>
  );
}
