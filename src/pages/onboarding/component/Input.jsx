import clsx from "clsx";
import React from "react";

export default function Input({
  label = "",
  type = "",
  name = "",
  placeholder = "",
  value = "",
  onChange,
  onBlur,
  error,
  readOnly = false,
}) {
  return (
    <div>
      <div className="flex flex-col w-full">
        <label className="text-black mb-3.5">{label}</label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={readOnly}
          className={clsx(
            "mt-1 w-100 border rounded pl-4 py-3 border-black/10 placeholder:text-black/30 focus:outline-primary/70",
            error && "border-red-600",
            readOnly && "bg-gray-100 cursor-not-allowed text-gray-600"
          )}
        />
        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
}

export function InputSelect({ label, name, id, values = [], value, onChange }) {
  return (
    <div className="flex flex-col gap-3.5">
      <label htmlFor={id}>{label}</label>

      <select
        className="mt-1 w-100 border rounded pl-4 py-3 border-black/10 focus:outline-primary/70"
        name={name}
        id={id}
        value={value ?? ""}
        onChange={onChange}
      >
        <option value="" disabled>
          Select role
        </option>

        {values.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Loading from "../../../../component/loading/Loading";

export function BooleanSwitch({ label = "Enabled", value = false, onChange }) {
  return (
    <FormControlLabel
      labelPlacement="start"
      label={`${label} : `}
      control={
        <Switch
          checked={value}
          onChange={(e) => onChange?.(e.target.checked)}
          color="primary"
        />
      }
    />
  );
}

export function AccountListToAdd({
  accounts = [],
  selectedAccounts = [],
  user = null,
  toggleAccount,
  loading
}) {
  // console.log(selectedAccounts)
  if(loading)(<>
    <Loading />
  </>)
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-3">Accounts</label>

      <div className="grid grid-cols-2 gap-4">
        {/* ALL ACCOUNTS */}
        <div className="border border-gray-200 rounded p-3 bg-gray-50 max-h-64 overflow-y-auto">
          <h4 className="text-sm font-medium mb-2">All Accounts</h4>

          {accounts.map((acc) => (
            <label key={acc.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedAccounts.includes(acc.id)}
                disabled={user?.role.roleName !== "ADMIN"}
                onChange={() => toggleAccount(acc.id)}
              />
              <span className="font-mono">{acc.arn}</span>
              <span className="text-gray-500">({acc.name})</span>
            </label>
          ))}
        </div>

        {/* LINKED ACCOUNTS */}
        <div className="border border-gray-200 rounded p-3">
          <h4 className="text-sm font-medium mb-2">Linked Accounts</h4>

          {accounts
            .filter((acc) => selectedAccounts.includes(acc.id))
            .map((acc) => (
              <div key={acc.id} className="text-sm">
                ✓ {acc.arn} ({acc.name})
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
