<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRequest;
use App\Http\Resources\EventResource;
use App\Models\Event;

class EventController extends Controller
{
    // GET /api/events
    public function index()
    {
        $events = Event::where('is_active', true)->latest()->get();
        return EventResource::collection($events);
    }


    public function adminIndex()
    {
        return EventResource::collection(Event::latest()->get());
    }

    // POST /api/events
    public function store(EventRequest $request)
    {
        $event = Event::create($request->validated());
        return new EventResource($event);
    }

    public function show(Event $event)
    {
        return new EventResource($event);
    }

    // PUT /api/events/
    public function update(EventRequest $request, Event $event)
    {
        $event->update($request->validated());
        return new EventResource($event);
    }

    // DELETE /api/events/
    public function destroy(Event $event)
    {
        $event->delete();
        return response()->json(['message' => 'Événement supprimé.']);
    }
}
