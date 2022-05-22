import clsx from 'clsx';
import { isDark } from '~/util/color';
import * as palette from '../../colors';

const gradient = [
  '#020024',
  '#022456',
  '#1e236f',
  '#3f1ace',
  '#ae1ee4',
  '#f934e5',
  '#ff8ce2',
  '#fff8fb',
];

export default function Colors() {
  let gCheck = [...gradient];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Object.entries(palette).map(([name, colors]) =>
        name !== 'default' && typeof colors !== 'string' ? (
          <div key={name}>
            <h3 className="text-center text-xl font-bold">{name}</h3>
            <ul>
              {Object.entries(colors).map(([shade, value]) => {
                if (shade === 'DEFAULT') {
                  return null;
                }
                const isGradient = gCheck.indexOf(value.toLowerCase());
                if (isGradient !== -1) {
                  gCheck.splice(isGradient, 1);
                }

                return (
                  <li
                    key={shade}
                    style={{ backgroundColor: value }}
                    className={clsx(
                      isDark(value) ? 'text-white' : 'text-black',
                      'flex justify-between py-1 px-3 text-sm text-opacity-60',
                    )}
                  >
                    <span>
                      {name}-{shade}
                    </span>
                    {isGradient !== -1 ? '+++' : null}
                    {value === (palette as any)[name].DEFAULT ? '**' : null}
                    <span>{value}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null,
      )}
      {gCheck.length ? `MISSING: ${gCheck.join(', ')}` : null}
    </div>
  );
}
