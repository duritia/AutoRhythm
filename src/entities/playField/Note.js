import isGameEntity from 'components/entities/isGameEntity';
import hasPosition from 'components/hasPosition';
import canEmit from 'components/canEmit';
import eventConfig from 'configs/eventConfig';

const Note = function NoteFunc(parent) {
    const state = {};
    let rect;
    const board = parent;
    let index = 0;

    function init(i, x) {
        state.setX(x);
        index = i;
    }

    function update(currentIndex, stepsPerSec, stepSize, max) {
        const distance = (index - currentIndex) * stepSize;
        state.setY(board.getY() - distance);
        if (!rect && state.getY() > 0 && state.getY() < board.getY() + 400) {
            rect = board.getParentState().add.graphics();
            rect.lineStyle(2, 0xff0000, 1);
            rect.strokeRect(0, 0, 50, 50);
        }
        if (rect && state.getY() > board.getY() + 400) {
            rect.destroy();
            rect = undefined;
            state.hit = true;
            state.emit(eventConfig.EVENTS.TONE.LEFT_LANE, state);
        }
        if (rect) {
            rect.x = state.getX();
            rect.y = state.getY();
        }
    }

    function onHit() {
        state.hit = true;
    }

    const isGameEntityState = isGameEntity(state);
    const hasPositionState = hasPosition(state);
    const canEmitState = canEmit(state);
    return Object.assign(state, isGameEntityState, hasPositionState, canEmitState, {
        // props
        hit: false,
        // methods
        init,
        update,
        onHit,
    });
};

export default Note;