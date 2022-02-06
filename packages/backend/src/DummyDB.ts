import {Scramble, Solved} from "shared";

export const DB = new class {
  private _solves = new Map<string, [Scramble, Array<Solved>]>();

  public scramble(scramble: Scramble): void {
    this._solves.set(scramble.id, [scramble, []]);
    console.log(`scramble: ${scramble.id}`);


    setTimeout(() => {
      console.log(`rm: scramble: ${scramble.id}`);
      this._solves.delete(scramble.id);
    }, 30 * 1000 * 20);

  }

  public solve(scrambleId: string, solve: Solved): [Scramble, Array<Solved>] {
    const times = this.times(scrambleId);
    times[1].push(solve);
    times[1].sort((l, r) => l.time - r.time);

    console.log(`solved: ${scrambleId} ${solve.user}`);

    return times;
  }

  public times(scrambleId: string): [Scramble, Array<Solved>] {
    if (!this._solves.has(scrambleId)) {
      throw new Error("not found");
    }
    return this._solves.get(scrambleId)!!;
  }
}();
