import { render, screen } from '@testing-library/react';
import { vi, it, expect } from 'vitest';
import App from './App';

// モデルの取得はネットワークに出るのでモックする
vi.mock('@tensorflow/tfjs', () => ({
  loadLayersModel: vi.fn(async () => ({
    summary: () => {},
    predict: () => ({ dataSync: () => new Float32Array(45) }),
  })),
  tensor: vi.fn(),
}));

it('renders without crashing', async () => {
  render(<App />);
  expect(await screen.findByText('Select Mark and Start')).toBeDefined();
});
